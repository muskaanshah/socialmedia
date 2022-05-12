import ResizeTextarea from 'react-textarea-autosize';
import {
  Avatar,
  Button,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';

function AddPostModal({ isOpen, onClose }) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack alignItems={'flex-start'}>
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size="md"
            />
            <Textarea
              minH="unset"
              placeholder="What's happening?"
              w="100%"
              resize="none"
              minRows={8}
              maxRows={8}
              maxlength="1000"
              as={ResizeTextarea}
              _placeholder={{ fontWeight: '400', color: 'gray.500' }}
              _focus={{ border: 'none' }}
            />
          </HStack>
        </ModalBody>
        <ModalFooter justifyContent={'space-between'}>
          <Button variant={'ghost'} _focus={{ border: 'none' }}>
            <FormLabel
              _focus={{ border: 'none' }}
              className="custom-file-upload"
              m={0}
            >
              <Input type="file" accept="image/*" />
              <span class="material-icons-outlined">image</span>
            </FormLabel>
          </Button>
          <Button mr={3} onClick={onClose} _focus={{ border: 'none' }}>
            POST
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { AddPostModal };
