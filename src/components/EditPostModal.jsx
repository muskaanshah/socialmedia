import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResizeTextarea from 'react-textarea-autosize';
import {
  Avatar,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { editPost, getPostByUserId } from '../pages/Home/postSlice';
import { getAllUsers } from '../pages/Home/userSlice';

function EditPostModal({ isOpen, onClose, desc, postID }) {
  const [postDescription, setPostDescription] = useState(desc);
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const editPostHandler = async () => {
    onClose();
    await dispatch(
      editPost({
        description: postDescription,
        postID: postID,
      })
    ).unwrap();
    await dispatch(getPostByUserId(currentUser.uid)).unwrap();
    dispatch(getAllUsers());
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack alignItems={'flex-start'}>
            <Avatar
              name={currentUser.name}
              src={currentUser.photoURL}
              size="md"
            />
            <Textarea
              minH="unset"
              placeholder="What's happening?"
              w="100%"
              resize="none"
              minRows={8}
              maxRows={8}
              maxLength="1000"
              as={ResizeTextarea}
              _placeholder={{ fontWeight: '400', color: 'gray.500' }}
              _focus={{ border: 'none' }}
              value={postDescription}
              onChange={e => setPostDescription(e.target.value)}
              autoFocus
            />
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} _focus={{ border: 'none' }} onClick={editPostHandler}>
            UPDATE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { EditPostModal };
