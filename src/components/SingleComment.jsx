import { useEffect, useState } from 'react';
import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import { getComments } from '../services';

function SingleComment({ comment }) {
  const [userDetails, setUserDetails] = useState({
    name: '',
    photoURL: '',
    id: '',
    username: '',
  });
  const [commentDetails, setCommentDetails] = useState({
    comment: '',
    uploadDate: '',
    userID: '',
  });
  useEffect(() => {
    getComments(comment, setCommentDetails, setUserDetails);
  }, [comment]);
  return (
    <Box my={2}>
      <HStack alignItems="flex-start">
        <Avatar name={userDetails.name} src={userDetails.photoURL} size="md" />
        <Text>
          <Text as={'span'} fontWeight="500">
            {`${userDetails.username} `}
          </Text>
          {commentDetails.comment}
        </Text>
      </HStack>
    </Box>
  );
}

export { SingleComment };
