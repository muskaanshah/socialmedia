import {
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';

const functionButtonStyles = {
  w: 'full',
  justify: 'flex-start',
  spacing: '2',
  cursor: 'pointer',
};

function EditDeletePostPopover({ postID }) {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          aria-label="Search database"
          _focus={{ border: 'none' }}
          background="transparent"
          _hover={{ background: 'transparent' }}
          _active={{ background: 'transparent' }}
          color="inherit"
          icon={<span class="material-icons-outlined">more_vert</span>}
        />
      </PopoverTrigger>
      <PopoverContent w="40" _focus={{ border: 'none' }}>
        <PopoverArrow />
        <PopoverBody>
          <VStack>
            <HStack sx={functionButtonStyles}>
              <span className="material-icons-outlined">edit</span>
              <Text fontSize="1rem">Edit</Text>
            </HStack>
            <HStack color="red.400" sx={functionButtonStyles}>
              <span className="material-icons-outlined">delete</span>
              <Text fontSize="1rem">Delete</Text>
            </HStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export { EditDeletePostPopover };
