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

function FollowingList({ isOpen, onClose, following }) {
  const [userObjectArray, setUserObjectArray] = useState([]);
  useEffect(() => {
    following?.length > 0 &&
      getUserObjectsInArray(following, setUserObjectArray);
  }, [following]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Following</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {userObjectArray.map(user => (
              <UserFollowStack
                key={user.uid}
                user={user}
                userList={following}
                setUserObjectArray={setUserObjectArray}
              />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export { FollowingList };
