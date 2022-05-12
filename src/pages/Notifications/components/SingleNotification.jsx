import { Avatar, Box, Divider, HStack, Text } from '@chakra-ui/react';

function SingleNotification() {
  return (
    <>
      <Box p={{ base: 2, md: 4 }}>
        <HStack spacing={3} w="full">
          <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            size="md"
          />
          <Text fontSize="1rem">
            <Text as={'span'} fontWeight="500">
              {`Username `}
            </Text>
            started following you
          </Text>
        </HStack>
      </Box>
      <Divider />
    </>
  );
}

export { SingleNotification };
