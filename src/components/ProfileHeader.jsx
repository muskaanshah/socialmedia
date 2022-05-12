import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';

function ProfileHeader() {
  return (
    <HStack spacing={3} w="full" alignItems={'flex-start'}>
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" size="md" />
      <VStack align="flex-start">
        <Text fontSize="1rem">Profile</Text>
        <Text fontSize="1rem" className="mt-0" color="gray.500">
          Username
        </Text>
      </VStack>
    </HStack>
  );
}

export { ProfileHeader };
