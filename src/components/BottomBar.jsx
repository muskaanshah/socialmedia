import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Avatar, Box, HStack, Link, useColorModeValue } from '@chakra-ui/react';

function BottomBar() {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const { curUser } = useSelector(state => state.user);
  const { pathname } = useLocation();
  const curLoc = pathname.split('/')[1];
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
        <Link
          as={NavLink}
          to="/home"
          w="full"
          textAlign="center"
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
          _activeLink={{ fontWeight: 'bold' }}
        >
          {curLoc === 'home' ? (
            <span className="material-icons">home</span>
          ) : (
            <span className="material-icons-outlined">home</span>
          )}
        </Link>
        <Link
          as={NavLink}
          to="/explore"
          w="full"
          textAlign="center"
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
          _activeLink={{ fontWeight: 'bold' }}
        >
          <span className="material-icons-outlined">search</span>
        </Link>
        <Link
          as={NavLink}
          to="/saved"
          w="full"
          textAlign="center"
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
          _activeLink={{ fontWeight: 'bold' }}
        >
          {curLoc === 'saved' ? (
            <span className="material-icons">bookmark</span>
          ) : (
            <span className="material-icons-outlined">bookmark_border</span>
          )}
        </Link>
        {/* To be implemented later */}
        {/* <Link
          as={NavLink}
          to="/notifications"
          w="full"
          textAlign="center"
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
          _activeLink={{ fontWeight: 'bold' }}
        >
          {curLoc === "notifications" ? <span className="material-icons">
notifications
</span> :
              <span className="material-icons-outlined">notifications</span>}
        </Link> */}
        <Link
          as={NavLink}
          to={`/profile/${curUser.uid}`}
          w="full"
          textAlign="center"
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
        >
          <Avatar name={curUser.name} src={curUser.photoURL} size="sm" />
        </Link>
      </HStack>
    </Box>
  );
}

export { BottomBar };
