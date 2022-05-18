import { useEffect, useState } from 'react';
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  HStack,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  addPostToSaved,
  getPostByUserId,
  likePost,
  removePostFromSaved,
  unlikePost,
} from '../pages/Home/postSlice';
import { getAllUsers, getCurrentUserDetails } from '../pages/Home/userSlice';
import { getUserDetailsByIdForHeader } from '../services';
import { AddComment } from './AddComment';
import { EditDeletePopover } from './EditDeletePopover';
import { LikesModal } from './LikesModal';
import { ProfileHeader } from './ProfileHeader';
import { SingleComment } from './SingleComment';

function FeedPost({ post }) {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { currentUser } = useSelector(state => state.auth);
  const { curUser } = useSelector(state => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    photoURL: '',
    uid: '',
    username: '',
  });
  const navigate = useNavigate();

  const likeHandler = async () => {
    await dispatch(
      likePost({ postID: post.uid, currentUserId: currentUser.uid })
    ).unwrap();
    dispatch(getAllUsers());
    dispatch(getPostByUserId(userID));
  };

  const unlikeHandler = async () => {
    await dispatch(
      unlikePost({ postID: post.uid, currentUserId: currentUser.uid })
    ).unwrap();
    dispatch(getAllUsers());
    dispatch(getPostByUserId(userID));
  };

  const saveHandler = async () => {
    await dispatch(
      addPostToSaved({ postID: post.uid, currentUserId: currentUser.uid })
    ).unwrap();
    dispatch(getCurrentUserDetails(currentUser.uid));
  };

  const unsaveHandler = async () => {
    await dispatch(
      removePostFromSaved({
        postID: post.uid,
        currentUserId: currentUser.uid,
      })
    ).unwrap();
    dispatch(getCurrentUserDetails(currentUser.uid));
  };

  useEffect(() => {
    getUserDetailsByIdForHeader(post.userID, setUserDetails);
  }, [post.userID, users]);
  useEffect(() => {
    setIsLiked(post?.likes?.find(userID => userID === currentUser.uid));
    setIsBookmarked(curUser?.bookmarked?.includes(post.uid));
  }, [currentUser.uid, post.likes, curUser?.bookmarked, post.uid]);

  return (
    <>
      <Box maxW="full" p={4} mx={{ base: 'auto', sm: 8 }}>
        <HStack w="full">
          <ProfileHeader userDetails={userDetails} />
          {post.userID === currentUser.uid && (
            <EditDeletePopover
              postID={post.uid}
              type="post"
              desc={post.description}
            />
          )}
        </HStack>
        <Text my={4}>{post.description}</Text>
        {post.photoURL && <Image src={post.photoURL} alt="post" my={4} />}
        <Text color="gray.500" fontSize="xs">
          {post.uploadDate}
        </Text>
        <HStack w="full" my={4}>
          <HStack spacing={6} grow={1} w="full">
            <Box as="span" cursor="Pointer">
              {isLiked ? (
                <FaHeart size="1.5em" onClick={unlikeHandler} />
              ) : (
                <FaRegHeart size="1.5em" onClick={likeHandler} />
              )}
            </Box>
            <Box
              as="span"
              cursor="Pointer"
              onClick={() => navigate(`/post/${post.uid}`)}
            >
              <FaRegComment size="1.5em" />
            </Box>
          </HStack>
          <Box as="span" cursor="Pointer">
            {isBookmarked ? (
              <FaBookmark size="1.5em" onClick={unsaveHandler} />
            ) : (
              <FaRegBookmark size="1.5em" onClick={saveHandler} />
            )}
          </Box>
        </HStack>
        {post.likes.length > 0 && (
          <Text my={2} onClick={onOpen} cursor="pointer">
            {`${post?.likes?.length} ${
              post?.likes?.length === 1 ? 'like' : 'likes'
            }`}
          </Text>
        )}
        <Box cursor="Pointer" onClick={() => navigate(`/post/${post.uid}`)}>
          {post.comments.length > 1 && (
            <Text
              color={'gray.500'}
            >{`View all ${post.comments.length} comments`}</Text>
          )}
          {post.comments.length > 0 && (
            <SingleComment comment={post.comments[post.comments.length - 1]} />
          )}
        </Box>
        <AddComment postID={post.uid} />
        <LikesModal isOpen={isOpen} onClose={onClose} likes={post.likes} />
      </Box>
      <Divider />
    </>
  );
}

export { FeedPost };
