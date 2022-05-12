import ResizeTextarea from 'react-textarea-autosize';
import { Button, HStack, Textarea } from '@chakra-ui/react';

function AddComment() {
  return (
    <HStack>
      <Textarea
        minH="unset"
        placeholder="Add a comment"
        w="100%"
        resize="none"
        minRows={1}
        maxRows={4}
        as={ResizeTextarea}
      />
      <Button _focus={{ border: 'none' }}>Send</Button>
    </HStack>
  );
}

export { AddComment };
