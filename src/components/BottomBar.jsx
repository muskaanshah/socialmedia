import { Avatar, Box, HStack, useColorModeValue } from '@chakra-ui/react';

function BottomBar() {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  return (
    <Box
      bg={bgColor}
      p={3}
      display={{ base: 'block', md: 'none' }}
      pos="sticky"
      bottom="0"
      w="100%"
      zIndex="docked"
    >
      <HStack justify={['space-between', 'space-evenly']}>
        <span className="material-icons-outlined">home</span>
        <span className="material-icons-outlined">search</span>
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
