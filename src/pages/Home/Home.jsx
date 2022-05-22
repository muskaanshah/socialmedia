import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Center, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getFeedPosts } from '../../services';
import { TopBar } from './components/TopBar';

function Home() {
  const [feedPosts, setFeedPosts] = useState([]);
  const { users, curUser } = useSelector(state => state.user);
  useEffect(() => {
    let feedArray = [];
    users.forEach(
      user =>
        curUser?.following?.includes(user.uid) && feedArray.push(...user.posts)
    );
    curUser?.posts?.forEach(post => feedArray.push(post));
    feedArray.length > 0 && getFeedPosts(feedArray, setFeedPosts);
  }, [users, curUser]);
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
