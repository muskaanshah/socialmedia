import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Center, Divider, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getPostByUserId } from '../Home/postSlice';
import { getCurrentUserDetails, getSingleUser } from '../Home/userSlice';
import { ProfileDescription } from './components/ProfileDescription';
import { TopBar } from './components/TopBar';

function Profile() {
  const [postsFeed, setPostsFeed] = useState([]);
  const { currentUser } = useSelector(state => state.auth);
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { userPosts } = useSelector(state => state.post);

  useEffect(() => {
    userID === currentUser.uid && dispatch(getCurrentUserDetails(userID));
    dispatch(getSingleUser(userID));
    dispatch(getPostByUserId(userID));
  }, [dispatch, userID, currentUser.uid]);
  useEffect(() => {
    const tempPosts = [...userPosts].sort((a, b) => {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    });
    setPostsFeed(tempPosts);
  }, [userPosts]);

  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      <ProfileDescription />
      <Divider />
      {postsFeed?.length > 0 ? (
        postsFeed.map(post => <FeedPost post={post} key={post.uid} />)
      ) : (
        <Center height="20vh">
          <Text>No posts to show</Text>
        </Center>
      )}
    </Box>
  );
}

export { Profile };
