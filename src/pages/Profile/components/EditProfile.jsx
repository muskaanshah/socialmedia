import { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { EditHeaderImage } from './EditHeaderImage';
import { EditOtherDetails } from './EditOtherDetails';
import { EditProfileImage } from './EditProfileImage';

const LinkButtonStyles = {
  _focus: { border: 'none' },
  color: 'inherit',
  fontWeight: '400',
};
function EditProfile({ isOpen, onClose }) {
  const [headerDiv, setHeaderDiv] = useState(false);
  const [avatarDiv, setAvatarDiv] = useState(false);
  const [otherDetailsDiv, setOtherDetailsDiv] = useState(false);

  const onCloseHandler = () => {
    setHeaderDiv(false);
    setAvatarDiv(false);
    setOtherDetailsDiv(false);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="4">
          <VStack spacing={4} w="full" align="flex-start">
            <Button
              sx={LinkButtonStyles}
              variant="link"
              onClick={() => setHeaderDiv(prev => !prev)}
            >
              Edit header image
            </Button>
            {headerDiv && <EditHeaderImage setHeaderDiv={setHeaderDiv} />}
            <Button
              sx={LinkButtonStyles}
              variant="link"
              onClick={() => setAvatarDiv(prev => !prev)}
            >
              Edit avatar
            </Button>
            {avatarDiv && <EditProfileImage setAvatarDiv={setAvatarDiv} />}
            <Button
              sx={LinkButtonStyles}
              variant="link"
              onClick={() => setOtherDetailsDiv(prev => !prev)}
            >
              Edit other details
            </Button>
            {otherDetailsDiv && (
              <EditOtherDetails setOtherDetailsDiv={setOtherDetailsDiv} />
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { EditProfile };
