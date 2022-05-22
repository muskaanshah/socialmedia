import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Center, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getFeedPosts } from '../Home/postSlice';
// import { getFeedPosts } from '../../services';
import { TopBar } from './components/TopBar';

function Saved() {
  const { curUser } = useSelector(state => state.user);
  const { savedPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentLocation = pathname.split('/').slice(1);
  // const [feedPosts, setFeedPosts] = useState([]);
  useEffect(() => {
    dispatch(getFeedPosts({ feedArray: curUser?.bookmarked, currentLocation }));
  }, [curUser?.bookmarked, dispatch]);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      {savedPosts?.length > 0 ? (
        savedPosts.map(post => <FeedPost post={post} key={post.uid} />)
      ) : (
        <Center height="70vh">
          <Text>Save posts to visit them later</Text>
        </Center>
      )}
    </Box>
  );
}

export { Saved };
