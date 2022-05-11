import { Box, Divider } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { TopBar } from './components/TopBar';

function Explore() {
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

export { Explore };
