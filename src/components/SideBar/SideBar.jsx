import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react';

function SideBar() {
  return (
    <Box
      bg="inherit"
      p={3}
      display={{ base: 'none', md: 'flex' }}
      w="20rem"
      position="sticky"
      top="0"
      gap="1rem"
    >
      <Divider orientation="vertical" />
      <VStack align="flex-start" spacing={6} w="full">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<span class="material-icons-outlined">search</span>}
          />
          <Input variant="filled" placeholder="Search" />
        </InputGroup>
        <Text fontWeight="500">Suggested for you</Text>
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
          <Button variant="link">Follow</Button>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <HStack spacing={3}>
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
          <Button variant="link">Follow</Button>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <HStack spacing={3}>
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
          <Button variant="link">Follow</Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export { SideBar };
