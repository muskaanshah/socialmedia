import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../../firebase';
import {
  getCurrentUserDetails,
  getSingleUser,
  updateCurrentUserDetails,
} from '../../Home/userSlice';

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
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    photo: currentUser.photoURL,
    name: currentUser.name,
    bio: currentUser.bio,
    headerImage: currentUser.headerImage,
    headerURL: '',
    photoURL: '',
  });
  const { photo, name, bio, headerImage, headerURL, photoURL } = userDetails;
  const bannerFile = useRef();
  const avatarFile = useRef();
  const bannerChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setUserDetails({
        ...userDetails,
        headerImage: URL.createObjectURL(e.target.files[0]),
        headerURL: e.target.files[0],
      });
    }
  };
  const avatarChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setUserDetails({
        ...userDetails,
        photo: URL.createObjectURL(e.target.files[0]),
        photoURL: e.target.files[0],
      });
    }
  };

  const submitHandler = async () => {
    onClose();
    const headerRef = ref(storage, `${currentUser.uid}/${headerURL.name}`);
    const headerSnapshot = await uploadBytes(headerRef, headerURL);
    const headerDownloadURL = await getDownloadURL(headerSnapshot.ref);
    const avatarRef = ref(storage, `${currentUser.uid}/${photoURL.name}`);
    const avatarSnapshot = await uploadBytes(avatarRef, photoURL);
    const avatarURL = await getDownloadURL(avatarSnapshot.ref);
    await dispatch(
      updateCurrentUserDetails({
        headerImage: headerDownloadURL || currentUser.headerImage,
        photoURL: avatarURL || currentUser.photoURL,
        name: name,
        bio: bio,
        currentUserID: currentUser.uid,
      })
    ).unwrap();
    dispatch(getCurrentUserDetails(currentUser.uid));
    dispatch(getSingleUser(currentUser.uid));
  };
  console.log(userDetails);
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} w="full" align="flex-start">
            <Box pos="relative" w="full">
              <Image
                minW="full"
                h="8rem"
                src={headerImage}
                alt="banner"
                fallbackSrc="https://via.placeholder.com/500"
              />
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
              <Avatar name={name} src={photo} size="md" />
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
              <Input
                id="name"
                type="text"
                placeholder="Add your name"
                value={name}
                onChange={e =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />
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
                value={bio}
                onChange={e =>
                  setUserDetails({ ...userDetails, bio: e.target.value })
                }
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={submitHandler}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { EditProfile };
