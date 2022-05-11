import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SingleComment } from '../SingleComment/SingleComment';

function FeedPost() {
  return (
    <Box maxW="full" p={4} mx={{ base: 'auto', sm: 8 }}>
      <HStack spacing={3} w="full" alignItems={'flex-start'}>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size="md"
        />
        <VStack align="flex-start">
          <Text fontSize="1rem">Profile</Text>
          <Text fontSize="1rem" className="mt-0" color="gray.500">
            Username
          </Text>
        </VStack>
      </HStack>
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
      <Divider />
    </Box>
  );
}

export { FeedPost };
