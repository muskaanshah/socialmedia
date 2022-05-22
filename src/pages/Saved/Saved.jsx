import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getFeedPosts } from '../Home/postSlice';
// import { getFeedPosts } from '../../services';
import { TopBar } from './components/TopBar';

function Saved() {
  const { curUser } = useSelector(state => state.user);
  const { feedPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();
  // const [feedPosts, setFeedPosts] = useState([]);
  useEffect(() => {
    dispatch(getFeedPosts(curUser?.bookmarked));
  }, [curUser?.bookmarked, dispatch]);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      {feedPosts?.length > 0 ? (
        feedPosts.map(post => <FeedPost post={post} key={post.uid} />)
      ) : (
        <Center height="70vh">
          <Text>Save posts to visit them later</Text>
        </Center>
      )}
    </Box>
  );
}

export { Saved };
