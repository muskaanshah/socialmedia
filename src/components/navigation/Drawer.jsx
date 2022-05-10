import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';

function Drawer() {
  return (
    <Box
      bg="inherit"
      p={3}
      display={{ base: 'none', md: 'flex' }}
      w="15rem"
      position="sticky"
      top="0"
      justifyContent="space-between"
    >
      <VStack justifyContent="space-between" w="full">
        <VStack align="flex-start" spacing={6} w="full" pr="8">
          <HStack>
            <span className="material-icons-outlined">home</span>
            <Text fontSize="1rem">Home</Text>
          </HStack>
          <HStack>
            <span className="material-icons-outlined">explore</span>
            <Text fontSize="1rem">Explore</Text>
          </HStack>
          <HStack>
            <span className="material-icons-outlined">bookmark_border</span>
            <Text fontSize="1rem">Saved</Text>
          </HStack>
          <HStack>
            <span className="material-icons-outlined">notifications</span>
            <Text fontSize="1rem">Notifications</Text>
          </HStack>
          <Button borderRadius="2xl" w="full" _focus={{ border: 'none' }}>
            Add a post
          </Button>
        </VStack>
        <HStack spacing={3} w="full">
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
      </VStack>
      <Divider orientation="vertical" />
    </Box>
  );
}

export { Drawer };
