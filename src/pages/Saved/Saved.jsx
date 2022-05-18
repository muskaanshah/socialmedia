import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getFeedPosts } from '../../services';
import { TopBar } from './components/TopBar';

function Saved() {
  const { curUser } = useSelector(state => state.user);
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    curUser?.bookmarked?.length > 0 &&
      getFeedPosts(curUser?.bookmarked, setFeedPosts, setLoading);
  }, [curUser?.bookmarked]);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      {loading ? (
        <Center height="70vh">
          <Spinner size="xl" speed="0.75s" color="blue.300" />
        </Center>
      ) : (
        <>
          {feedPosts.length > 0 ? (
            feedPosts.map(post => <FeedPost post={post} key={post.uid} />)
          ) : (
            <Center height="70vh">
              <Text>Save posts to visit them later</Text>
            </Center>
          )}
        </>
      )}
    </Box>
  );
}

export { Saved };
