import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getPostById } from '../Home/postSlice';
import { ProfileDescription } from './components/ProfileDescription';
import { TopBar } from './components/TopBar';

function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const { userPosts } = useSelector(state => state.post);
  useEffect(() => {
    dispatch(getPostById(currentUser.uid));
  }, [dispatch, currentUser]);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      <ProfileDescription />
      <Divider />
      {userPosts.length > 0 &&
        userPosts.map(post => (
          <FeedPost post={post} key={post.uid} userID={currentUser.uid} />
        ))}
    </Box>
  );
}

export { Profile };
