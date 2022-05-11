import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { AddComment } from '../AddComment/AddComment';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader';
import { SingleComment } from '../SingleComment/SingleComment';

function FeedPost() {
  return (
    <Box maxW="full" p={4} mx={{ base: 'auto', sm: 8 }}>
      <ProfileHeader />
      <Image src="https://bit.ly/2Z4KKcF" alt="post" my={4} />
      <HStack w="full">
        <HStack spacing={6} grow={1} w="full">
          <FaRegHeart size="1.5em" />
          <FaRegComment size="1.5em" />
        </HStack>
        <FaRegBookmark size="1.5em" />
      </HStack>
      <Text my={2}>57 likes</Text>
      <Text color={'gray.500'}>View all 32 comments</Text>
      <SingleComment />
      <AddComment />
    </Box>
  );
}

export { FeedPost };
