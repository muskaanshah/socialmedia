import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { setSearchText } from '../pages/Home/userSlice';

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchText, users } = useSelector(state => state.user);
  const hoverColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');
  const bgColor = useColorModeValue('gray.200', 'gray.850');
  const itemListCalculation = () => {
    const itemStartsWith = users.filter(user =>
      user.username.toLowerCase().startsWith(searchText.toLowerCase())
    );
    const itemIncludes = users.filter(user =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    const itemIncludesNotInStartsWith = itemIncludes.reduce((acc, curr) => {
      const itemAlreadyPresent = itemStartsWith.find(
        curItem => curItem.uid === curr.uid
      );
      return itemAlreadyPresent ? acc : [...acc, curr];
    }, []);
    const finalItemList = itemStartsWith.concat(itemIncludesNotInStartsWith);
    return finalItemList;
  };
  return (
    <Box position="relative">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<span className="material-icons-outlined">search</span>}
        />
        <Input
          variant="filled"
          placeholder="Search by username"
          value={searchText}
          onChange={e => dispatch(setSearchText(e.target.value))}
        />
      </InputGroup>
      {searchText.trim().length > 0 && (
        <Box
          w="full"
          position="absolute"
          top="10"
          background={bgColor}
          zIndex="5"
          borderRadius="4"
          py="2"
        >
          {itemListCalculation().length > 0 ? (
            <VStack
              align="flex-start"
              spacing="0"
              background="inherit"
              maxH="300"
              overflow="auto"
              w="full"
            >
              {itemListCalculation()
                .filter((_, index) => index < 10)
                .map(user => (
                  <HStack
                    cursor="pointer"
                    px="2"
                    py="1"
                    w="full"
                    _hover={{ backgroundColor: hoverColor }}
                    onClick={() => {
                      navigate(`/profile/${user.uid}`);
                      dispatch(setSearchText(''));
                    }}
                  >
                    <Avatar name={user.name} src={user.photoURL} size="md" />
                    <VStack align="flex-start">
                      <Text fontSize="1rem">{user.name}</Text>
                      <Text fontSize="1rem" className="mt-0" color="gray.500">
                        @{user.username}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
            </VStack>
          ) : (
            <Box p="2">No users found</Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export { Search };
