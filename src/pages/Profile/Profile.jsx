import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Divider } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getPostByUserId } from '../Home/postSlice';
import { ProfileDescription } from './components/ProfileDescription';
import { TopBar } from './components/TopBar';

function Profile() {
  const [postsFeed, setPostsFeed] = useState([]);
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { userPosts } = useSelector(state => state.post);
  const { users } = useSelector(state => state.user);
  const curUser = users.find(user => user.uid === userID);

  useEffect(() => {
    dispatch(getPostByUserId(curUser.uid));
  }, [dispatch, curUser]);
  useEffect(() => {
    const tempPosts = [...userPosts].sort((a, b) => {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    });
    setPostsFeed(tempPosts);
  }, [userPosts]);

  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      <ProfileDescription curUser={curUser} />
      <Divider />
      {postsFeed?.length > 0 &&
        postsFeed.map(post => <FeedPost post={post} key={post.uid} />)}
    </Box>
  );
}

export { Profile };
