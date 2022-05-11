import { Box } from '@chakra-ui/react';
import { TopBar } from './components/TopBar';

function Home() {
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
    </Box>
  );
}

export { Home };
