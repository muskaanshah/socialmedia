import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Center, Divider, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getPostByUserId } from '../Home/postSlice';
import { getSingleUser } from '../Home/userSlice';
import { ProfileDescription } from './components/ProfileDescription';
import { TopBar } from './components/TopBar';

function Profile() {
  const { currentUser } = useSelector(state => state.auth);
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { userPosts } = useSelector(state => state.post);
  useEffect(() => {
    dispatch(getSingleUser(userID));
    dispatch(getPostByUserId(userID));
  }, [dispatch, userID, currentUser.uid]);

  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      <ProfileDescription />
      <Divider />
      {userPosts?.length > 0 ? (
        userPosts.map(post => <FeedPost post={post} key={post.uid} />)
      ) : (
        <Center height="20vh">
          <Text>No posts to show</Text>
        </Center>
      )}
    </Box>
  );
}

export { Profile };
