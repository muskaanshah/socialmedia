import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Link,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { logo } from '../assets';
import { AddPostModal } from './AddPostModal';

function Drawer() {
  const logoColor = useColorModeValue('blue.500', 'blue.200');
  const hoverColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { curUser } = useSelector(state => state.user);
  const { pathname } = useLocation();
  const curLoc = pathname.split('/')[1];
  const drawerLinks = {
    _hover: {
      backgroundColor: hoverColor,
      textDecoration: 'none',
    },
    _focus: { outline: 'none' },
    w: 'full',
    borderRadius: '4',
  };
  return (
    <Box
      bg="inherit"
      pl={3}
      display={{ base: 'none', md: 'flex' }}
      position="sticky"
      top="0"
      justifyContent="space-between"
      maxH="100vh"
    >
      <VStack justifyContent="space-between" w="full" py={4}>
        <VStack align="flex-start" spacing="2" w="full" pr="8">
          <NavLink to="/home">
            <HStack>
              <Image
                boxSize="50px"
                objectFit="cover"
                src={logo}
                alt="Medioso"
              />
              <Text fontSize="3xl" textStyle="logo" color={logoColor}>
                Medioso
              </Text>
            </HStack>
          </NavLink>
          <Link
            as={NavLink}
            to="/home"
            sx={drawerLinks}
            _activeLink={{ fontWeight: 'bold' }}
          >
            <HStack p="2">
              {curLoc === 'home' ? (
                <span className="material-icons">home</span>
              ) : (
                <span className="material-icons-outlined">home</span>
              )}
              <Text fontSize="1rem">Home</Text>
            </HStack>
          </Link>
          <Link
            as={NavLink}
            to="/explore"
            sx={drawerLinks}
            _activeLink={{ fontWeight: 'bold' }}
          >
            <HStack p="2">
              {curLoc === 'explore' ? (
                <span className="material-icons">explore</span>
              ) : (
                <span className="material-icons-outlined">explore</span>
              )}
              <Text fontSize="1rem">Explore</Text>
            </HStack>
          </Link>
          <Link
            as={NavLink}
            to="/saved"
            sx={drawerLinks}
            _activeLink={{ fontWeight: 'bold' }}
          >
            <HStack p="2">
              {curLoc === 'saved' ? (
                <span className="material-icons">bookmark</span>
              ) : (
                <span className="material-icons-outlined">bookmark_border</span>
              )}
              <Text fontSize="1rem">Saved</Text>
            </HStack>
          </Link>
          {/* To be implemented later */}
          {/* <Link
            as={NavLink}
            to="/notifications"
            sx={drawerLinks}
            _activeLink={{ fontWeight: 'bold' }}
          >
            <HStack p="2">
            {curLoc === "notifications" ? <span className="material-icons">
notifications
</span> :
              <span className="material-icons-outlined">notifications</span>}
              <Text fontSize="1rem">Notifications</Text>
            </HStack>
          </Link> */}
          <Button
            borderRadius="2xl"
            w="full"
            _focus={{ border: 'none' }}
            onClick={onOpen}
          >
            Add a post
          </Button>
        </VStack>
        <Link
          as={NavLink}
          to={`/profile/${curUser.uid}`}
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
          w="full"
        >
          <HStack spacing={3} w="full">
            <Avatar name={curUser.name} src={curUser.photoURL} size="md" />
            <VStack align="flex-start">
              <Text fontSize="1rem">{curUser.name}</Text>
              <Text fontSize="1rem" className="mt-0" color="gray.500">
                @{curUser.username}
              </Text>
            </VStack>
          </HStack>
        </Link>
      </VStack>
      <Divider orientation="vertical" />
      <AddPostModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export { Drawer };
