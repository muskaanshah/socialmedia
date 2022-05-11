import { Heading, Stack, Text } from '@chakra-ui/react';

function CommonHeader() {
  return (
    <Stack spacing={{ base: 10, md: 20 }}>
      <Heading
        lineHeight={1.1}
        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
      >
        <Text
          as={'span'}
          bgGradient="linear(to-r, blue.400,purple.400)"
          bgClip="text"
        >
          Medioso,
        </Text>{' '}
        the only networking platform you'll ever need
      </Heading>
    </Stack>
  );
}

export { CommonHeader };
