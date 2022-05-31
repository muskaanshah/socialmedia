import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
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
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Following</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {userObjectArray.length === 0 ? (
            <Text>No following</Text>
          ) : (
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
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export { FollowingList };
