import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import {
  Box,
  Divider,
  HStack,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddComment } from '../AddComment/AddComment';
import { LikesModal } from '../LikesModal/LikesModal';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader';
import { SingleComment } from '../SingleComment/SingleComment';

function FeedPost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
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
        <Text my={2} onClick={onOpen} cursor="pointer">
          57 likes
        </Text>
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
