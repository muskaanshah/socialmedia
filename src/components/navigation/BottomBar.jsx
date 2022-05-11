import { Avatar, Box, HStack } from '@chakra-ui/react';

function BottomBar() {
  return (
    <Box
      bg="inherit"
      p={3}
      display={{ base: 'block', md: 'none' }}
      pos="fixed"
      bottom="0"
      w="100%"
      zIndex={2}
    >
      <HStack justify={['space-between', 'space-evenly']}>
        <span className="material-icons-outlined">home</span>
        <span class="material-icons-outlined">search</span>
        <span className="material-icons-outlined">bookmark_border</span>
        <span className="material-icons-outlined">notifications</span>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size="sm"
        />
      </HStack>
    </Box>
  );
}

export { BottomBar };
