import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { TopBarStyles } from '../../../styles/globalStyles';

function TopBar() {
  const bgCol = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  return (
    <Box bgColor={bgCol} sx={TopBarStyles}>
      <Text fontSize="lg" display={{ base: 'none', md: 'block' }}>
        Explore
      </Text>
      <Box mx={{ base: 4, sm: 8 }} display={{ base: 'block', md: 'none' }}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<span className="material-icons-outlined">search</span>}
          />
          <Input variant="filled" placeholder="Search" />
        </InputGroup>
      </Box>
    </Box>
  );
}

export { TopBar };
