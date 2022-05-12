import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { UserFollowStack } from '../UserFollowStack/UserFollowStack';

function LikesModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent height={'80vh'} overflow="auto">
        <ModalHeader>Liked by</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <UserFollowStack />
            <UserFollowStack />
            <UserFollowStack />
            <UserFollowStack />
            <UserFollowStack />
            <UserFollowStack />
            <UserFollowStack />
            <UserFollowStack />
            <UserFollowStack />
            <UserFollowStack />
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
