import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Box, Center, HStack, Image, Text } from '@chakra-ui/react';
import { AddComment, ProfileHeader, SingleComment } from '../../components';

function SinglePost() {
  return (
    <Box maxW="full" p={4} mx={{ base: 'auto', sm: 8 }}>
      <ProfileHeader />
      <Center>
        <Image
          src="https://picsum.photos/300"
          alt="post"
          my={4}
          w={{ base: 'full', md: 'auto' }}
          minH={{ base: 'auto', md: '500px' }}
        />
      </Center>
      <HStack w="full">
        <HStack spacing={6} grow={1} w="full">
          <FaRegHeart size="1.5em" />
          <FaRegComment size="1.5em" />
        </HStack>
        <FaRegBookmark size="1.5em" />
      </HStack>
      <Text my={2}>57 likes</Text>
      {/* <Text color={'gray.500'}>View all 32 comments</Text> */}
      <SingleComment />
      <SingleComment />
      <SingleComment />
      <SingleComment />
      <SingleComment />
      <SingleComment />
      <AddComment />
    </Box>
  );
}

export { SinglePost };
