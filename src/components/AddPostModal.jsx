import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { storage } from '../firebase';
import { addPost } from '../pages/Home/postSlice';
import { addPostToCurrentUserPosts } from '../pages/Home/userSlice';
import { getDateTime } from '../utils';

function AddPostModal({ isOpen, onClose }) {
  const [img, setImg] = useState({
    preview: '',
    url: '',
  });
  const [postDescription, setPostDescription] = useState('');
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentLocation = pathname.split('/').slice(1);
  const file = useRef();
  const imageChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setImg({
        ...img,
        url: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const addPostHandler = async () => {
    const tempDate = getDateTime(new Date());
    onClose();
    const postRef = ref(storage, `${currentUser.uid}/${img.url.name}`);
    const postSnapshot = await uploadBytes(postRef, img.url);
    const postDownloadURL = await getDownloadURL(postSnapshot.ref);
    const randomId = uuid();
    dispatch(
      addPost({
        description: postDescription,
        photoURL: !!img.url ? postDownloadURL : '',
        uploadDate: tempDate,
        id: currentUser.uid,
        uid: randomId,
        currentLocation,
      })
    );
    dispatch(addPostToCurrentUserPosts(randomId));
  };

  useEffect(() => {
    return () => {
      setImg({ preview: '', url: '' });
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
              name={currentUser?.name}
              src={currentUser?.photoURL}
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
          {img.preview.length > 0 && (
            <Box pos="relative" display="inline-block" mt={4}>
              <Image
                id="thumbnail"
                src={img.preview}
                alt="selected"
                maxW="100px"
              />
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
          <Button
            mr={3}
            _focus={{ border: 'none' }}
            onClick={addPostHandler}
            disabled={!img.url && !postDescription.trim()}
          >
            POST
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { AddPostModal };
