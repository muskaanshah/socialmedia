import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getPostById } from '../Home/postSlice';
import { ProfileDescription } from './components/ProfileDescription';
import { TopBar } from './components/TopBar';

function Profile() {
  const [postsFeed, setPostsFeed] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const { userPosts } = useSelector(state => state.post);
  useEffect(() => {
    dispatch(getPostById(currentUser.uid));
  }, [dispatch, currentUser]);
  useEffect(() => {
    const tempPosts = [...userPosts].sort((a, b) => {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    });
    setPostsFeed(tempPosts);
  }, [userPosts]);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      <ProfileDescription currentUser={currentUser} />
      <Divider />
      {postsFeed.length > 0 &&
        postsFeed.map(post => <FeedPost post={post} key={post.uid} />)}
    </Box>
  );
}

export { Profile };
