import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { TopBar } from './components/TopBar';
import { getAllUsers } from './userSlice';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
    </Box>
  );
}

export { Home };
