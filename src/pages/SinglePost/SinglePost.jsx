import { useEffect, useState } from 'react';
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
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
  EditDeletePopover,
  LikesModal,
  ProfileHeader,
  SingleComment,
} from '../../components';
import { getUserDetailsByIdForHeader } from '../../services';
import {
  addPostToSaved,
  getSinglePost,
  likePost,
  removePostFromSaved,
  unlikePost,
} from '../Home/postSlice';
import { addPostToBookmarks, removePostFromBookmarks } from '../Home/userSlice';

function SinglePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { currentUser } = useSelector(state => state.auth);
  const { curUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: '',
    photoURL: '',
    uid: '',
    username: '',
  });
  const { postID } = useParams();
  const { singlePost } = useSelector(state => state.post);
  const { pathname } = useLocation();
  const currentLocation = pathname.split('/').slice(1);
  const likeHandler = () => {
    dispatch(
      likePost({
        postID: singlePost.uid,
        currentUserId: currentUser.uid,
        currentLocation,
      })
    );
  };

  const unlikeHandler = () => {
    dispatch(
      unlikePost({
        postID: singlePost.uid,
        currentUserId: currentUser.uid,
        currentLocation,
      })
    );
  };

  const saveHandler = async () => {
    await dispatch(
      addPostToSaved({
        postID: singlePost.uid,
        currentUserId: currentUser.uid,
        currentLocation,
      })
    ).unwrap();
    dispatch(addPostToBookmarks(singlePost.uid));
  };

  const unsaveHandler = async () => {
    await dispatch(
      removePostFromSaved({
        postID: singlePost.uid,
        currentUserId: currentUser.uid,
        currentLocation,
      })
    ).unwrap();
    dispatch(removePostFromBookmarks(singlePost.uid));
  };

  useEffect(() => {
    (async () => {
      await dispatch(getSinglePost(postID)).unwrap();
      getUserDetailsByIdForHeader(singlePost.userID, setUserDetails);
    })();
  }, [postID, dispatch, singlePost.userID]);

  useEffect(() => {
    setIsLiked(singlePost?.likes?.find(userID => userID === currentUser.uid));
    setIsBookmarked(curUser?.bookmarked?.includes(singlePost?.uid));
  }, [
    currentUser.uid,
    singlePost?.likes,
    curUser?.bookmarked,
    singlePost?.uid,
    singlePost?.isDeleted,
  ]);

  return (
    <Box maxW="full" p={4} mx={{ base: 'auto', sm: 8 }}>
      {singlePost?.isDeleted === true ? (
        <Center h="50vh">
          <Text>Post deleted</Text>
        </Center>
      ) : (
        <>
          <HStack w="full">
            <ProfileHeader userDetails={userDetails} />
            {singlePost.userID === currentUser.uid && (
              <EditDeletePopover
                id={singlePost.uid}
                type="post"
                desc={singlePost.description}
              />
            )}
          </HStack>
          <Text my={4}>{singlePost.description}</Text>
          {singlePost.photo && (
            <Center>
              <Image
                src={singlePost.photo}
                alt="post"
                my={4}
                w={{ base: 'full', md: 'auto' }}
                maxH={{ base: 'auto', md: '500px' }}
              />
            </Center>
          )}
          <Text color="gray.500" fontSize="xs">
            {singlePost.uploadDate}
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
              <Box as="span" cursor="Pointer">
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
          {singlePost?.likes?.length > 0 && (
            <Text my={2} onClick={onOpen} cursor="pointer">
              {`${singlePost?.likes?.length} ${
                singlePost?.likes?.length === 1 ? 'like' : 'likes'
              }`}
            </Text>
          )}
          {singlePost?.comments?.map(comment => (
            <SingleComment
              comment={comment}
              key={comment}
              postID={singlePost.uid}
            />
          ))}
          <AddComment postID={postID} />
          <LikesModal
            isOpen={isOpen}
            onClose={onClose}
            likes={singlePost.likes}
          />
        </>
      )}
    </Box>
  );
}

export { SinglePost };
