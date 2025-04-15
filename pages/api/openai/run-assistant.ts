import OpenAI from 'openai';
import { AssistantResponse } from 'ai';

export const config = {
  runtime: 'edge',
};

const openai = new OpenAI();

export default async function handler(req: Request) {
  try {
    const input: {
      threadId: string | null;
      message: string;
      portfolio: {
        portfolio_date: string;
        assets: Array<{
          name: string;
          ticker: string;
          asset_class: string;
          current_price: string;
          portfolio_percentage: number;
          annual_return: string;
        }>;
      };
    } = await req.json();

    const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;
    const { message, portfolio } = input;

    const assistantId = process.env.OPENAI_ASSISTANT_ID || '';

    if (!threadId) {
      return new Response('Thread ID is required', { status: 400 });
    }

    if (!message) {
      return new Response('Message is required', { status: 400 });
    }

    if (!assistantId) {
      return new Response('Assistant ID is required', { status: 400 });
    }

    // Add portfolio information to the message
    const portfolioContext = `Current Portfolio Information:
Date: ${portfolio.portfolio_date}
Assets:
${portfolio.assets.map(asset => `
- ${asset.name} (${asset.ticker})
  Class: ${asset.asset_class}
  Current Price: ${asset.current_price}
  Portfolio %: ${asset.portfolio_percentage}%
  Annual Return: ${asset.annual_return}
`).join('')}`;

    const fullMessage = `${portfolioContext}\n\nUser Message: ${message}`;

    const createdMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: fullMessage,
    });

    return AssistantResponse(
      { threadId, messageId: createdMessage.id },
      async ({ forwardStream, sendDataMessage }) => {
        const runStream = openai.beta.threads.runs.stream(threadId, {
          assistant_id: assistantId,
        });

        let runResult = await forwardStream(runStream);

        // Handle tool calls if any are required.
        while (
          runResult?.status === 'requires_action' &&
          runResult.required_action?.type === 'submit_tool_outputs'
        ) {
          const tool_outputs = runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall) => {
              const parameters = JSON.parse(toolCall.function.arguments);

              switch (toolCall.function.name) {
                case 'create_visualization':
                  const { type, title, data, config } = parameters;

                  sendDataMessage({
                    role: 'data',
                    data: {
                      type: 'visualization',
                      visualization: {
                        type,
                        title,
                        data,
                        config,
                      },
                    },
                  });

                  return {
                    tool_call_id: toolCall.id,
                    output: `Created ${type} chart: ${title}`,
                  };

                default:
                  throw new Error(`Unknown tool call function: ${toolCall.function.name}`);
              }
            }
          );

          runResult = await forwardStream(
            openai.beta.threads.runs.submitToolOutputsStream(threadId, runResult.id, {
              tool_outputs,
            })
          );
        }
      }
    );
  } catch (error) {
    console.error('The API encountered an error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
