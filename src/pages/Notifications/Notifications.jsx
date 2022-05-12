import { Box } from '@chakra-ui/react';
import { SingleNotification } from './components/SingleNotification';
import { TopBar } from './components/TopBar';

function Notifications() {
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      <SingleNotification />
      <SingleNotification />
      <SingleNotification />
      <SingleNotification />
    </Box>
  );
}

export { Notifications };
