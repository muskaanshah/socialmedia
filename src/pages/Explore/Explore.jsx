import { Box } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { TopBar } from './components/TopBar';

function Explore() {
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
    </Box>
  );
}

export { Explore };
