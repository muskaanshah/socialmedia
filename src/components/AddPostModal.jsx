import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResizeTextarea from 'react-textarea-autosize';
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { addPost, getPostByUserId } from '../pages/Home/postSlice';
import { getAllUsers } from '../pages/Home/userSlice';
import { CloseButtonBlack } from '../styles/globalStyles';
import { getDateTime } from '../utils';

function AddPostModal({ isOpen, onClose }) {
  const [imgUrl, setImgUrl] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const file = useRef();
  const imageChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const addPostHandler = async () => {
    const tempDate = getDateTime(new Date());
    onClose();
    await dispatch(
      addPost({
        description: postDescription,
        photoURL: imgUrl,
        uploadDate: tempDate,
        id: currentUser.uid,
      })
    ).unwrap();
    await dispatch(getPostByUserId(currentUser.uid)).unwrap();
    dispatch(getAllUsers());
  };

  useEffect(() => {
    return () => {
      setImgUrl('');
      setPostDescription('');
    };
  }, [isOpen]);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new post</ModalHeader>
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
          {imgUrl.length > 0 && (
            <Box pos="relative" display="inline-block" mt={4}>
              <Image id="thumbnail" src={imgUrl} alt="selected" maxW="100px" />
              <Button
                sx={CloseButtonBlack}
                onClick={() => {
                  file.value = '';
                  setImgUrl('');
                }}
              >
                <span className="material-icons-outlined sm">close</span>
              </Button>
            </Box>
          )}
        </ModalBody>
        <ModalFooter justifyContent={'space-between'}>
          <Button variant={'ghost'} _focus={{ border: 'none' }}>
            <FormLabel
              _focus={{ border: 'none' }}
              className="custom-file-upload"
              m={0}
            >
              <Input
                type="file"
                accept="image/*"
                ref={file}
                onChange={imageChange}
              />
              <span className="material-icons-outlined">image</span>
            </FormLabel>
          </Button>
          <Button mr={3} _focus={{ border: 'none' }} onClick={addPostHandler}>
            POST
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { AddPostModal };
