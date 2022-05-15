import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { AuthInputStyles } from '../../styles/globalStyles';
import { signUpUser } from './authSlice';
import { CommonHeader } from './components/CommonHeader';

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });

  const dispatch = useDispatch();

  const formInputHandler = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const signUpFormHandler = e => {
    e.preventDefault();
    dispatch(signUpUser(userDetails));
  };
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20 }}
      >
        <CommonHeader />
        <Stack
          bgGradient="linear(to-r, blue.400,purple.400)"
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.50'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Sign Up!
            </Heading>
          </Stack>
          <Box as={'form'} mt={10} onSubmit={signUpFormHandler}>
            <Stack spacing={4}>
              <Input
                type="text"
                placeholder="Full Name"
                sx={AuthInputStyles}
                _placeholder={{
                  color: 'gray.800',
                }}
                value={userDetails.name}
                onChange={e => formInputHandler('name', e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Username"
                sx={AuthInputStyles}
                _placeholder={{
                  color: 'gray.800',
                }}
                value={userDetails.username}
                onChange={e => formInputHandler('username', e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                sx={AuthInputStyles}
                _placeholder={{
                  color: 'gray.800',
                }}
                value={userDetails.email}
                onChange={e => formInputHandler('email', e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                sx={AuthInputStyles}
                _placeholder={{
                  color: 'gray.800',
                }}
                value={userDetails.password}
                onChange={e => formInputHandler('password', e.target.value)}
                required
              />
            </Stack>
            <Button
              type="submit"
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgColor={'gray.100'}
              color={'gray.900'}
              _hover={{
                boxShadow: 'xl',
              }}
              _active={{
                boxShadow: 'xl',
              }}
            >
              Create an account
            </Button>
          </Box>
          <Link to="/" className="text-underline">
            Already have an account?
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}

export { Signup };
