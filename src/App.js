import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BottomBar, Drawer, SideBar } from './components';

function App() {
  return (
    <Box px={{ base: 0, lg: 6 }} maxW="8xl" mx="auto">
      {/* <ColorModeSwitcher /> */}
      <BottomBar />
      <Flex width="100%" minH="100vh">
        <Drawer />
        <Outlet />
        {/* <SideBar /> */}
      </Flex>
    </Box>
  );
}

export default App;
