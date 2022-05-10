import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BottomBar, Drawer, SideBar } from './components';

function App() {
  return (
    <Box p={{ base: 0, lg: 6 }}>
      <ColorModeSwitcher />
      <BottomBar />
      <Flex width="100%" h="calc(100vh - 3rem)">
        <Drawer />
        <Outlet />
        <SideBar />
      </Flex>
    </Box>
  );
}

export default App;
