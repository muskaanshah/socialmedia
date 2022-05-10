import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomBar, Drawer } from './components';

function App() {
  return (
    <Box p={{ base: 0, lg: 6 }}>
      <BottomBar />
      <Flex>
        <Drawer />
        <Outlet />
      </Flex>
    </Box>
  );
}

export default App;
