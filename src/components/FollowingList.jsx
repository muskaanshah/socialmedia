import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  useEffect(() => {
    following?.length > 0 &&
      getUserObjectsInArray(following, setUserObjectArray);
    return () => {
      setUserObjectArray([]);
    };
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
                onClick={() => {
                  onClose();
                  navigate(`/profile/${user.uid}`);
                }}
              />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export { FollowingList };
