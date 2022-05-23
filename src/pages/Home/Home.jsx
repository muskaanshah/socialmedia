import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Center, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { TopBar } from './components/TopBar';
import { getFeedPosts } from './postSlice';

function Home() {
  const { users, curUser } = useSelector(state => state.user);
  const { homePosts } = useSelector(state => state.post);
  const { pathname } = useLocation();
  const currentLocation = pathname.split('/').slice(1);
  const dispatch = useDispatch();
  useEffect(() => {
    let feedArray = [];
    users.forEach(
      user =>
        curUser?.following?.includes(user?.uid) &&
        feedArray.push(...user?.posts)
    );
    curUser?.posts?.forEach(post => feedArray.push(post));
    dispatch(getFeedPosts({ feedArray, currentLocation }));
  }, [users, curUser]);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      {homePosts?.length > 0 ? (
        homePosts.map(post => <FeedPost post={post} key={post?.uid} />)
      ) : (
        <Center height="70vh">
          <Text>Follow people to see their posts</Text>
        </Center>
      )}
    </Box>
  );
}

export { Home };
