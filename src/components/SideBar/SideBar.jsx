import {
  Box,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { UserFollowStack } from '../UserFollowStack/UserFollowStack';

function SideBar() {
  return (
    <Box
      bg="inherit"
      pr={3}
      display={{ base: 'none', lg: 'flex' }}
      w="27rem"
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
        <UserFollowStack />
        <UserFollowStack />
        <UserFollowStack />
      </VStack>
    </Box>
  );
}

export { SideBar };
