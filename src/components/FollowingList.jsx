import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { UserFollowStack } from './UserFollowStack/UserFollowStack';

function FollowingList({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Following</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <UserFollowStack />
            <UserFollowStack />
            <UserFollowStack />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export { FollowingList };
