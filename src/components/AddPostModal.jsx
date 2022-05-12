import { useRef, useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  HStack,
  Image,
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
  const [imgUrl, setImgUrl] = useState('');
  const file = useRef();
  const imageChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

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
              maxLength="1000"
              as={ResizeTextarea}
              _placeholder={{ fontWeight: '400', color: 'gray.500' }}
              _focus={{ border: 'none' }}
              autoFocus
            />
          </HStack>
          {imgUrl.length > 0 && (
            <Box pos="relative" display="inline-block" mt={4}>
              <Image id="thumbnail" src={imgUrl} alt="selected" maxW="100px" />
              <Button
                variant="ghost"
                pos="absolute"
                top={0}
                right={0}
                w="20px"
                minW="20px"
                h="20px"
                minH="20px"
                size="sm"
                color="white"
                p={0}
                borderRadius="full"
                backgroundColor={'blackAlpha.500'}
                _focus={{ border: 'none' }}
                onClick={() => {
                  file.value = '';
                  setImgUrl('');
                }}
              >
                <span class="material-icons-outlined sm">close</span>
              </Button>
            </Box>
          )}
        </ModalBody>
        <ModalFooter justifyContent={'space-between'}>
          <Button variant={'ghost'} _focus={{ border: 'none' }}>
            <FormLabel
              _focus={{ border: 'none' }}
              className="custom-file-upload"
              m={0}
            >
              <Input
                type="file"
                accept="image/*"
                ref={file}
                onChange={imageChange}
              />
              <span className="material-icons-outlined">image</span>
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
