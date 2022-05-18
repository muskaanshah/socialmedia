import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { getComments } from '../services';

function SingleComment({ comment }) {
  const navigate = useNavigate();
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

  const navigateToUserHandler = e => {
    navigate(`/profile/${userDetails.uid}`);
    e.stopPropagation();
  };

  useEffect(() => {
    getComments(comment, setCommentDetails, setUserDetails);
  }, [comment]);
  return (
    <Box my={2}>
      <HStack alignItems="flex-start">
        <Avatar
          name={userDetails.name}
          src={userDetails.photoURL}
          size="md"
          onClick={navigateToUserHandler}
          cursor="Pointer"
        />
        <VStack align="flex-start" w="full">
          <Text>
            <Text
              as={'span'}
              fontWeight="500"
              onClick={navigateToUserHandler}
              cursor="Pointer"
            >
              {`${userDetails.username} `}
            </Text>
            {commentDetails.comment}
          </Text>
          <Text color="gray.500" fontSize="xs">
            {commentDetails.uploadDate}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export { SingleComment };
