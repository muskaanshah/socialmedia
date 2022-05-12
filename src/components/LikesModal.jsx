import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { UserFollowStack } from './UserFollowStack';

function LikesModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Liked by</ModalHeader>
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
export { LikesModal };
