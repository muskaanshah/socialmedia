import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { MdNotificationsNone } from 'react-icons/md';
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
        <AiOutlineHome size="2em" />
        <AiOutlineSearch size="2em" />
        <BsBookmark size="2em" />
        <MdNotificationsNone size="2em" />
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
