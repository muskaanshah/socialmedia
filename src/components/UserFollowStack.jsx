import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react';

function UserFollowStack({ user }) {
  return (
    <HStack justifyContent="space-between" w="full">
      <HStack spacing={3} flexGrow="1">
        <Avatar name={user.name} src={user.photoURL} size="md" />
        <VStack align="flex-start">
          <Text fontSize="1rem">{user.name}</Text>
          <Text fontSize="1rem" className="mt-0" color="gray.500">
            @{user.username}
          </Text>
        </VStack>
      </HStack>
      <Button variant="link" _focus={{ border: 'none' }}>
        Follow
      </Button>
    </HStack>
  );
}

export { UserFollowStack };
