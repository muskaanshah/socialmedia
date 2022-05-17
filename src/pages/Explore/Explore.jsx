import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getFeedPosts } from '../../services';
import { getAllUsers } from '../Home/userSlice';
import { TopBar } from './components/TopBar';

function Explore() {
  const [feedPosts, setFeedPosts] = useState([]);
  const { users } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    let feedArray = [];
    const curUser = users.find(user => user.uid === currentUser.uid);
    const notFollowing = users.filter(
      user => !curUser.following.includes(user) || curUser.uid !== user
    );
    users.forEach(
      user => notFollowing.includes(user.uid) && feedArray.push(...user.posts)
    );
    feedArray.length > 0 && getFeedPosts(feedArray, setFeedPosts);
  }, [users, currentUser]);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      {feedPosts.length > 0 ? (
        feedPosts.map(post => <FeedPost post={post} key={post.uid} />)
      ) : (
        <Center height="70vh">
          <Text>Oops, we dont have new content to show</Text>
        </Center>
      )}
    </Box>
  );
}

export { Explore };
