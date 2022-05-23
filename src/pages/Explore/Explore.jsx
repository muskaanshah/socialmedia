import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Center, Text } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { getFeedPosts } from '../Home/postSlice';
import { getAllUsers } from '../Home/userSlice';
import { TopBar } from './components/TopBar';

function Explore() {
  const { users } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.auth);
  const { explorePosts } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentLocation = pathname.split('/').slice(1);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    let feedArray = [];
    const curUser = users.find(user => user.uid === currentUser.uid);
    const notFollowing = users?.filter(
      user =>
        !curUser?.following?.includes(user.uid) && curUser?.uid !== user.uid
    );
    notFollowing?.forEach(user => feedArray.push(...user.posts));
    dispatch(getFeedPosts({ feedArray, currentLocation }));
  }, [users, currentUser]);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      {explorePosts?.length > 0 ? (
        explorePosts.map(post => <FeedPost post={post} key={post.uid} />)
      ) : (
        <Center height="70vh">
          <Text>Oops, we dont have new content to show</Text>
        </Center>
      )}
    </Box>
  );
}

export { Explore };
