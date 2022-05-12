import { Box, Divider } from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { ProfileDescription } from './components/ProfileDescription';
import { TopBar } from './components/TopBar';

function Profile() {
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      <ProfileDescription />
      <Divider />
      <FeedPost />
      <FeedPost />
      <FeedPost />
      <FeedPost />
      <FeedPost />
    </Box>
  );
}

export { Profile };
