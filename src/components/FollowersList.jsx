import { useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { getSingleUser } from '../services';
import { UserFollowStack } from './UserFollowStack';

function FollowersList({ isOpen, onClose, followers }) {
  const [userObjectArray, setUserObjectArray] = useState([]);
  useEffect(() => {
    getSingleUser(followers, setUserObjectArray);
  }, [followers]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Followers</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {userObjectArray.map(user => (
              <UserFollowStack key={user.uid} user={user} />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export { FollowersList };
