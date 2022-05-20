import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { LinkButtonStyles } from '../../../styles/globalStyles';
import { signOutUser } from '../../authentication/authSlice';

function SettingsModal({ isOpen, onClose }) {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('light', 'dark');
  const [changePasswordDivToggle, setChangePasswordDivToggle] = useState(false);
  const [changeThemeDivToggle, setChangeThemeDivToggle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setChangePasswordDivToggle(false);
      setChangeThemeDivToggle(false);
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="4">
          <VStack align="flex-start">
            <Button
              sx={LinkButtonStyles}
              variant="link"
              onClick={() => setChangePasswordDivToggle(prev => !prev)}
            >
              Change password
            </Button>
            {changePasswordDivToggle && (
              <VStack mt={4} w="full">
                <Input
                  type="password"
                  placeholder="Enter old password"
                  isRequired
                />
                <Input
                  type="password"
                  placeholder="Enter new password"
                  isRequired
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  isRequired
                />
                <HStack className="mt-1">
                  <Button type="submit" variant="link" sx={LinkButtonStyles}>
                    Save
                  </Button>
                  <Button variant="link" sx={LinkButtonStyles}>
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            )}
            <Button
              sx={LinkButtonStyles}
              variant="link"
              onClick={() => setChangeThemeDivToggle(prev => !prev)}
            >
              Change theme
            </Button>
            {changeThemeDivToggle && (
              <HStack>
                <Text>Choose one: </Text>
                <Button
                  variant="link"
                  sx={LinkButtonStyles}
                  onClick={() => text !== 'light' && toggleColorMode()}
                >
                  <FaSun size="1.5em" />
                </Button>
                <Button
                  variant="link"
                  sx={LinkButtonStyles}
                  onClick={() => text !== 'dark' && toggleColorMode()}
                >
                  <FaMoon size="1.5em" />
                </Button>
              </HStack>
            )}
            <Button
              _focus={{ border: 'none' }}
              color="red.500"
              variant="link"
              onClick={() => {
                dispatch(signOutUser());
                onClose();
              }}
            >
              Logout
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { SettingsModal };
