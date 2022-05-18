import { useEffect, useState } from 'react';
import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from 'react-icons/fa';
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
import { getSinglePost, likePost, unlikePost } from '../Home/postSlice';

function SinglePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: '',
    photoURL: '',
    uid: '',
    username: '',
  });
  const { postID } = useParams();
  const { singlePost } = useSelector(state => state.post);
  const likeHandler = async () => {
    await dispatch(
      likePost({ postID: singlePost.uid, currentUserId: currentUser.uid })
    ).unwrap();
    dispatch(getSinglePost(postID));
  };

  const unlikeHandler = async () => {
    await dispatch(
      unlikePost({ postID: singlePost.uid, currentUserId: currentUser.uid })
    ).unwrap();
    dispatch(getSinglePost(postID));
  };
  useEffect(() => {
    (async () => {
      await dispatch(getSinglePost(postID)).unwrap();
      getUserDetailsByIdForHeader(singlePost.userID, setUserDetails);
    })();
  }, [postID, dispatch, singlePost.userID]);
  useEffect(() => {
    setIsLiked(singlePost?.likes?.find(userID => userID === currentUser.uid));
  }, [currentUser.uid, singlePost.likes]);
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
          <Box as="span" cursor="Pointer">
            {isLiked ? (
              <FaHeart size="1.5em" onClick={unlikeHandler} />
            ) : (
              <FaRegHeart size="1.5em" onClick={likeHandler} />
            )}
          </Box>
          <Box as="span" cursor="Pointer">
            <FaRegComment size="1.5em" />
          </Box>
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
      <LikesModal isOpen={isOpen} onClose={onClose} likes={singlePost.likes} />
    </Box>
  );
}

export { SinglePost };
