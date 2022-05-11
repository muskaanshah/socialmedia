import {
  Input,
  InputGroup,
  InputRightAddon,
  useColorModeValue,
} from '@chakra-ui/react';

function AddComment() {
  const color = useColorModeValue('blue.300', 'blue.500');
  return (
    <InputGroup size="sm">
      <Input placeholder="Add a comment" _focus={{ borderColor: 'none' }} />
      <InputRightAddon
        children={<span className="material-icons-outlined">send</span>}
        color={color}
        bgColor="transparent"
      />
    </InputGroup>
  );
}

export { AddComment };
