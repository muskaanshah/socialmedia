import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Box, Grid } from '@chakra-ui/react';
import { BottomBar, Drawer, SideBar } from './components';
import { getAllUsers } from './pages/Home/userSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <Box px={{ base: 0, lg: 6 }} maxW="8xl" mx="auto">
      <Grid
        width="100%"
        minH="100vh"
        templateColumns={{
          base: '1fr',
          md: '15rem 1fr',
          lg: '15rem 1fr 18rem',
        }}
      >
        <Drawer />
        <Outlet />
        <SideBar />
      </Grid>
      <BottomBar />
    </Box>
  );
}

export default App;
