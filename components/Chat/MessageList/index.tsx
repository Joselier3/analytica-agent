import type { Message as MessageType } from 'ai';
import { Stack } from '@mantine/core';
import classes from './MessageList.module.css';
import Message from './Message';

type Props = {
  messages: MessageType[] | undefined;
};

export default function MessageList({ messages }: Props) {
  if (!messages) {
    return null;
  }

  const filteredMessages = messages.filter((message) => !message.data);

  return (
    <Stack 
      className={classes.scrollable} 
      h="100%" 
      gap="md" 
      style={{ 
        overflow: 'auto',
        padding: '1rem'
      }}
    >
      <Message
        key="welcome"
        message={{
          id: 'welcome',
          role: 'assistant',
          content: 'Hi there! I can help you analyze your investment portfolio and provide insights. What would you like to know?',
        }}
        isLatest={filteredMessages.length === 0}
      />
      {filteredMessages.map((message, index) => (
        <Message 
          key={message.id} 
          message={message}
          isLatest={index === filteredMessages.length - 1}
        />
      ))}
    </Stack>
  );
}
