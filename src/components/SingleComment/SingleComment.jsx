import { Avatar, Box, HStack, Text } from '@chakra-ui/react';

function SingleComment() {
  return (
    <Box my={2}>
      <HStack alignItems="flex-start">
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size="md"
        />
        <Text>
          <Text as={'span'} fontWeight="500">
            {`Username `}
          </Text>
          Here is the comment - Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sit nihil pariatur natus autem quia officia soluta
          tempore architecto fugit nulla dolor maxime doloribus saepe
        </Text>
      </HStack>
    </Box>
  );
}

export { SingleComment };
