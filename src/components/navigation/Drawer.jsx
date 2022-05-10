import { Avatar, Box, VStack, HStack, Text, Divider } from '@chakra-ui/react';

function Drawer() {
  return (
    <Box
      bg="inherit"
      p={3}
      display={{ base: 'none', md: 'flex' }}
      w="15rem"
      position="sticky"
      h="100vh"
      justifyContent="space-between"
    >
      <VStack align="flex-start" spacing={6}>
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
        <HStack>
          <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            size="sm"
          />
          <Text fontSize="1rem">Profile</Text>
        </HStack>
      </VStack>
      <Divider orientation="vertical" />
    </Box>
  );
}

export { Drawer };
