import { Box, Divider } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { TopBar } from './components/TopBar';

function Home() {
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      <FeedPost />
      <Divider />
      <FeedPost />
      <Divider />
      <FeedPost />
      <Divider />
    </Box>
  );
}

export { Home };
