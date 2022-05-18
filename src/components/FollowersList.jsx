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

function FollowersList({ isOpen, onClose, followers }) {
  const [userObjectArray, setUserObjectArray] = useState([]);
  useEffect(() => {
    followers?.length > 0 &&
      getUserObjectsInArray(followers, setUserObjectArray);
    return () => {
      setUserObjectArray([]);
    };
  }, [followers]);
  const navigate = useNavigate();
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
export { FollowersList };
