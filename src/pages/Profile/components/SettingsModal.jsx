import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

const LinkButtonStyles = {
  _focus: { border: 'none' },
  color: 'inherit',
  fontWeight: '400',
};

function SettingsModal({ isOpen, onClose }) {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('light', 'dark');
  const [changePasswordDivToggle, setChangePasswordDivToggle] = useState(false);
  const [changeThemeDivToggle, setChangeThemeDivToggle] = useState(false);
  // useEffect(() => {
  //   return () => {
  //     setChangePasswordDivToggle(false)
  //     setChangeThemeDivToggle(false)
  //   }
  // }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
            <Button _focus={{ border: 'none' }} color="red.500" variant="link">
              Logout
            </Button>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { SettingsModal };