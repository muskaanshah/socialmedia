import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { TopBarStyles } from '../../../styles/globalStyles';

function TopBar() {
  const bgCol = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  return (
    <Box bgColor={bgCol} sx={TopBarStyles}>
      <Text fontSize="lg">Notifications</Text>
    </Box>
  );
}

export { TopBar };
