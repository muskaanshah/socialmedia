import { useRef, useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
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
  VStack,
} from '@chakra-ui/react';

const UploadButton = {
  color: 'inherit',
  _focus: { border: 'none' },
};
const FormLabelStyles = {
  _focus: { border: 'none' },
  className: 'custom-file-upload',
  m: '0',
  cursor: 'pointer',
};

function EditProfile({ isOpen, onClose }) {
  const [bannerUrl, setBannerUrl] = useState('https://picsum.photos/300');
  const [avatarUrl, setAvatarUrl] = useState('https://bit.ly/dan-abramov');
  const bannerFile = useRef();
  const avatarFile = useRef();
  const bannerChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const avatarChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} w="full" align="flex-start">
            <Box pos="relative" w="full">
              <Image minW="full" h="8rem" src={bannerUrl} alt="banner" />
              <Center pos="absolute" inset={0} bg="blackAlpha.500">
                <Button sx={UploadButton} variant="ghost">
                  <FormLabel sx={FormLabelStyles}>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={bannerFile}
                      onChange={bannerChange}
                    />
                    <span className="material-icons-outlined">add_a_photo</span>
                  </FormLabel>
                </Button>
              </Center>
            </Box>
            <HStack>
              <Avatar name="Dan Abrahmov" src={avatarUrl} size="md" />
              <Button sx={UploadButton} variant="link">
                <FormLabel sx={FormLabelStyles} fontWeight="400">
                  <Input
                    type="file"
                    accept="image/*"
                    ref={avatarFile}
                    onChange={avatarChange}
                  />
                  Edit Avatar
                </FormLabel>
              </Button>
            </HStack>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" type="text" placeholder="Add your name" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bio">Bio</FormLabel>
              <Textarea
                id="bio"
                minH="unset"
                placeholder="Add your bio"
                w="100%"
                resize="none"
                minRows={1}
                maxRows={4}
                maxLength="200"
                as={ResizeTextarea}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { EditProfile };
