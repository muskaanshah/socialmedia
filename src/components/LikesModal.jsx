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

function LikesModal({ isOpen, onClose, likes }) {
  const [userObjectArray, setUserObjectArray] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    likes?.length > 0 && getUserObjectsInArray(likes, setUserObjectArray);
  }, [likes]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Liked by</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {userObjectArray.map(user => (
              <UserFollowStack
                key={user.uid}
                user={user}
                userList={likes}
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
export { LikesModal };
