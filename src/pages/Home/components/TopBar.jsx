import { Box, HStack, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { logo } from '../../../assets';
import { TopBarStyles } from '../../../styles/globalStyles';

function TopBar() {
  const bgCol = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  const logoColor = useColorModeValue('blue.500', 'blue.200');
  return (
    <Box bgColor={bgCol} sx={TopBarStyles}>
      <HStack>
        <Image
          boxSize="40px"
          objectFit="cover"
          src={logo}
          alt="Medioso"
          display={{ base: 'block', md: 'none' }}
        />
        <Text fontSize="lg" display={{ base: 'none', md: 'block' }}>
          Home
        </Text>
        <Text
          fontSize="2xl"
          display={{ base: 'block', md: 'none' }}
          textStyle="logo"
          color={logoColor}
        >
          Medioso
        </Text>
      </HStack>
    </Box>
  );
}

export { TopBar };
