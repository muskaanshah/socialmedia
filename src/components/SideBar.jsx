import { useSelector } from 'react-redux';
import {
  Box,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { UserFollowStack } from './UserFollowStack';

function SideBar() {
  const { users } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.auth);
  const curUser = users.find(user => user.uid === currentUser.uid);
  return (
    <Box
      bg="inherit"
      pr={3}
      display={{ base: 'none', lg: 'flex' }}
      position="sticky"
      top="0"
      gap="1rem"
      maxH="100vh"
    >
      <Divider orientation="vertical" />
      <VStack align="flex-start" spacing={6} w="full" pt={4}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<span className="material-icons-outlined">search</span>}
          />
          <Input variant="filled" placeholder="Search" />
        </InputGroup>
        <Text fontWeight="500">Suggested for you</Text>
        {users
          .filter(
            user =>
              user.uid !== currentUser.uid &&
              !curUser.following.includes(user.uid)
          )
          .filter((_, index) => index < 5)
          .map(user => (
            <UserFollowStack key={user.uid} user={user} />
          ))}
      </VStack>
    </Box>
  );
}

export { SideBar };
