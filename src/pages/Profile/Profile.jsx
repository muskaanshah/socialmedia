import { Box } from '@chakra-ui/react';
import { TopBar } from './components/TopBar';

function Profile() {
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
    </Box>
  );
}

export { Profile };
