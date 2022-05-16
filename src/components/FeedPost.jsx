import { useEffect, useState } from 'react';
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import {
  Box,
  Divider,
  HStack,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { getUserDetailsById } from '../services';
import { AddComment } from './AddComment';
import { LikesModal } from './LikesModal';
import { ProfileHeader } from './ProfileHeader';
import { SingleComment } from './SingleComment';

function FeedPost({ post }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDetails, setUserDetails] = useState({
    name: '',
    photoURL: '',
    id: '',
    username: '',
  });
  useEffect(() => {
    getUserDetailsById(post.userID, setUserDetails);
  }, [post.userID]);
  return (
    <>
      <Box maxW="full" p={4} mx={{ base: 'auto', sm: 8 }}>
        <ProfileHeader userDetails={userDetails} />
        <Text my={4}>{post.description}</Text>
        {post.photoURL && <Image src={post.photoURL} alt="post" my={4} />}
        <Text color="gray.500" fontSize="xs">
          {post.uploadDate}
        </Text>
        <HStack w="full" my={4}>
          <HStack spacing={6} grow={1} w="full">
            <FaRegHeart size="1.5em" />
            <FaRegComment size="1.5em" />
          </HStack>
          <FaRegBookmark size="1.5em" />
        </HStack>
        {post.likes.length > 0 && (
          <Text my={2} onClick={onOpen} cursor="pointer">
            {`${post.likes.length} ${
              post.likes.length === 1 ? 'like' : 'likes'
            }`}
          </Text>
        )}
        {post.comments.length > 1 && (
          <Text
            color={'gray.500'}
          >{`View all ${post.comments.length} comments`}</Text>
        )}
        {post.comments.length > 0 && (
          <SingleComment comment={post.comments[post.comments.length - 1]} />
        )}
        <AddComment postID={post.uid} />
        <LikesModal isOpen={isOpen} onClose={onClose} />
      </Box>
      <Divider />
    </>
  );
}

export { FeedPost };
