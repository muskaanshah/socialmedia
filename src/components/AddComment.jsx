import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ResizeTextarea from 'react-textarea-autosize';
import { Button, HStack, Textarea } from '@chakra-ui/react';
import { addComment } from '../pages/Home/postSlice';
import { getDateTime } from '../utils';

function AddComment({ postID }) {
  const [commentInput, setCommentInput] = useState('');
  const { currentUser } = useSelector(state => state.auth);
  const { commentStatus } = useSelector(state => state.post);
  const { pathname } = useLocation();
  const currentLocation = pathname.split('/').slice(1);
  const dispatch = useDispatch();
  const addCommentHandler = async () => {
    await dispatch(
      addComment({
        comment: commentInput,
        postID,
        uploadDate: getDateTime(new Date()),
        userID: currentUser.uid,
        currentLocation,
      })
    ).unwrap();
    setCommentInput('');
  };
  return (
    <HStack mt="6">
      <Textarea
        minH="unset"
        placeholder="Add a comment"
        w="100%"
        resize="none"
        minRows={1}
        maxRows={4}
        maxLength="400"
        as={ResizeTextarea}
        value={commentInput}
        onChange={e => setCommentInput(e.target.value)}
      />
      {commentStatus === 'loading' ? (
        <Button isLoading variant="solid">
          Send
        </Button>
      ) : (
        <Button
          _focus={{ border: 'none' }}
          onClick={addCommentHandler}
          disabled={!commentInput.trim()}
        >
          Send
        </Button>
      )}
    </HStack>
  );
}

export { AddComment };
