import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getPostByPostId } from '../../services';
import { TopBar } from './components/TopBar';
import { getAllUsers } from './userSlice';

function Home() {
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
    users.forEach(
      user =>
        curUser?.following?.includes(user.uid) && feedArray.push(...user.posts)
    );
    feedArray.push(...curUser.posts);
    feedArray.length > 0 && getPostByPostId(feedArray, setFeedPosts);
  }, [users, currentUser]);
  console.log(feedPosts);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      {feedPosts.length > 0 ? (
        feedPosts.map(post => <FeedPost post={post} key={post.uid} />)
      ) : (
        <Center height="70vh">
          <Text>Follow people to see their posts</Text>
        </Center>
      )}
    </Box>
  );
}

export { Home };
