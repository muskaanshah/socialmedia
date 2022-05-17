import { useEffect, useState } from 'react';
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  AddComment,
  LikesModal,
  ProfileHeader,
  SingleComment,
} from '../../components';
import { getUserDetailsByIdForHeader } from '../../services';
import { getSinglePost } from '../Home/postSlice';

function SinglePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: '',
    photoURL: '',
    uid: '',
    username: '',
  });
  const { postID } = useParams();
  const { singlePost } = useSelector(state => state.post);
  useEffect(() => {
    (async () => {
      await dispatch(getSinglePost(postID)).unwrap();
      getUserDetailsByIdForHeader(singlePost.userID, setUserDetails);
    })();
  }, [postID, dispatch, singlePost.userID]);
  return (
    <Box maxW="full" p={4} mx={{ base: 'auto', sm: 8 }}>
      <ProfileHeader userDetails={userDetails} />
      <Center>
        <Image
          src="https://picsum.photos/300"
          alt="post"
          my={4}
          w={{ base: 'full', md: 'auto' }}
          minH={{ base: 'auto', md: '500px' }}
        />
      </Center>
      <HStack w="full" my={4}>
        <HStack spacing={6} grow={1} w="full">
          <FaRegHeart size="1.5em" />
          <FaRegComment size="1.5em" />
        </HStack>
        <FaRegBookmark size="1.5em" />
      </HStack>
      {singlePost?.likes?.length > 0 && (
        <Text my={2} onClick={onOpen} cursor="pointer">
          {`${singlePost?.likes?.length} ${
            singlePost?.likes?.length === 1 ? 'like' : 'likes'
          }`}
        </Text>
      )}
      {singlePost?.comments?.map(comment => (
        <SingleComment comment={comment} key={comment} />
      ))}
      <AddComment postID={postID} />
      <LikesModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export { SinglePost };
