import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react';

function UserFollowStack() {
  return (
    <HStack justifyContent="space-between" w="full">
      <HStack spacing={3} flexGrow="1">
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size="md"
        />
        <VStack align="flex-start">
          <Text fontSize="1rem">Profile</Text>
          <Text fontSize="1rem" className="mt-0" color="gray.500">
            Username
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
