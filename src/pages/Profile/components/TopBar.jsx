import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AddPostModal } from '../../../components';
import { TopBarStyles } from '../../../styles/globalStyles';

function TopBar() {
  const bgCol = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  const { singleUser } = useSelector(state => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bgColor={bgCol} sx={TopBarStyles}>
      <HStack w="full" justify="space-between">
        <VStack spacing={0} align="flex-start">
          <Text fontSize="lg">{singleUser?.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {singleUser?.posts?.length} posts
          </Text>
        </VStack>
        <Button
          variant="ghost"
          _focus={{ border: 'none' }}
          onClick={onOpen}
          color="inherit"
          p={0}
        >
          <span className="material-icons-outlined">post_add</span>
        </Button>
      </HStack>
      <AddPostModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export { TopBar };
