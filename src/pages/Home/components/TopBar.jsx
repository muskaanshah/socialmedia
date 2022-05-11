import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { logo } from '../../../assets';

function TopBar() {
  const bgCol = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  return (
    <Box
      p={{ base: 2, md: 4 }}
      position="sticky"
      top={0}
      bgColor={bgCol}
      backdropFilter="auto"
      backdropBlur="8px"
      zIndex="docked"
    >
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
    </Box>
  );
}

export { TopBar };
