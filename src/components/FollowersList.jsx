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

function FollowersList({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Followers</ModalHeader>
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
export { FollowersList };
