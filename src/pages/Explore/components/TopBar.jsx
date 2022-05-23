import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { Search } from '../../../components';
import { TopBarStyles } from '../../../styles/globalStyles';

function TopBar() {
  const bgCol = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  return (
    <Box bgColor={bgCol} sx={TopBarStyles}>
      <Text fontSize="lg" display={{ base: 'none', md: 'block' }}>
        Explore
      </Text>
      <Box mx={{ base: 4, sm: 8 }} display={{ base: 'block', md: 'none' }}>
        <Search />
      </Box>
    </Box>
  );
}

export { TopBar };
