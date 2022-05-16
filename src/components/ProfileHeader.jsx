import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';

function ProfileHeader({ userDetails }) {
  return (
    <HStack spacing={3} w="full" alignItems={'flex-start'}>
      <Avatar name={userDetails.name} src={userDetails.photoURL} size="md" />
      <VStack align="flex-start">
        <Text fontSize="1rem">{userDetails.name}</Text>
        <Text fontSize="1rem" className="mt-0" color="gray.500">
          {userDetails.username}
        </Text>
      </VStack>
    </HStack>
  );
}

export { ProfileHeader };
