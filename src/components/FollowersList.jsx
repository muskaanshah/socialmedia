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
import { getUserObjectsInArray } from '../services';
import { UserFollowStack } from './UserFollowStack';

function FollowersList({ isOpen, onClose, followers }) {
  const [userObjectArray, setUserObjectArray] = useState([]);
  useEffect(() => {
    getUserObjectsInArray(followers, setUserObjectArray);
  }, [followers]);
  // useEffect(() => {
  //   return () => onClose();
  // }, [onClose]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Followers</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {userObjectArray.map(user => (
              <UserFollowStack
                key={user.uid}
                user={user}
                userList={followers}
                setUserObjectArray={setUserObjectArray}
              />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export { FollowersList };
