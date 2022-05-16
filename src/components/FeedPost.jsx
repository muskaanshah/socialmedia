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
        <Image src="https://bit.ly/2Z4KKcF" alt="post" my={4} />
        <HStack w="full">
          <HStack spacing={6} grow={1} w="full">
            <FaRegHeart size="1.5em" />
            <FaRegComment size="1.5em" />
          </HStack>
          <FaRegBookmark size="1.5em" />
        </HStack>
        <Text mt={4}>{post.description}</Text>
        {post.likes.length > 0 && (
          <Text my={2} onClick={onOpen} cursor="pointer">
            {`${post.likes.length} ${
              post.likes.length === 1 ? 'like' : 'likes'
            }`}
          </Text>
        )}
        <Text color={'gray.500'}>View all 32 comments</Text>
        <SingleComment />
        <AddComment />
        <LikesModal isOpen={isOpen} onClose={onClose} />
      </Box>
      <Divider />
    </>
  );
}

export { FeedPost };
