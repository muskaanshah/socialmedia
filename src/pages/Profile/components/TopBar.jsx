import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { TopBarStyles } from '../../../styles/globalStyles';

function TopBar() {
  const bgCol = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  return (
    <Box bgColor={bgCol} sx={TopBarStyles}>
      <Text fontSize="lg">Muskaan Shah</Text>
      <Text fontSize="sm" color="gray.500">
        39 posts
      </Text>
    </Box>
  );
}

export { TopBar };
