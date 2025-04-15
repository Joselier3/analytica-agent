import { memo } from 'react';
import { Text, Group, Box, Stack } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import type { Message as MessageType } from 'ai';

type Props = {
  message: MessageType;
  isLatest: boolean;
};

const Message = memo(({ message, isLatest }: Props) => (
  <Stack gap="xs" style={{ maxWidth: '100%' }}>
    {message.role === 'assistant' && (
      <Group gap="xs" wrap="nowrap">
        <IconInfoCircle
          size={20}
          style={{ color: isLatest ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-6)' }}
        />
        <Text size="sm" c="dimmed" fw={500}>
          Analytica
        </Text>
      </Group>
    )}
    <Text 
      size="md" 
      style={{ 
        color: isLatest ? 'var(--mantine-color-dark-9)' : 'var(--mantine-color-gray-6)',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}
    >
      {message.content ?? ''}
    </Text>
  </Stack>
));

export default Message;
