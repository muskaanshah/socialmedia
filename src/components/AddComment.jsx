import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResizeTextarea from 'react-textarea-autosize';
import { Button, HStack, Textarea } from '@chakra-ui/react';
import { addComment, getSinglePost } from '../pages/Home/postSlice';
import { getAllUsers } from '../pages/Home/userSlice';
import { getDateTime } from '../utils';

function AddComment({ postID }) {
  const [commentInput, setCommentInput] = useState('');
  const { currentUser } = useSelector(state => state.auth);
  const { commentStatus } = useSelector(state => state.post);
  const dispatch = useDispatch();
  return (
    <HStack mt="6">
      <Textarea
        minH="unset"
        placeholder="Add a comment"
        w="100%"
        resize="none"
        minRows={1}
        maxRows={4}
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
          onClick={async () => {
            await dispatch(
              addComment({
                comment: commentInput,
                postID: postID,
                uploadDate: getDateTime(new Date()),
                userID: currentUser.uid,
              })
            ).unwrap();
            dispatch(getAllUsers()).unwrap();
            dispatch(getSinglePost(postID));
            setCommentInput('');
          }}
        >
          Send
        </Button>
      )}
    </HStack>
  );
}

export { AddComment };
