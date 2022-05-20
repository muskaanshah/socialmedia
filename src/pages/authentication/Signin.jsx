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
import { AuthInputStyles, submitButtonStyles } from '../../styles/globalStyles';
import { signInUser } from './authSlice';
import { CommonHeader } from './components/CommonHeader';

function Signin() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const formInputHandler = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const signInFormHandler = e => {
    e.preventDefault();
    dispatch(signInUser(userDetails));
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
              Sign In!
            </Heading>
          </Stack>
          <Box as={'form'} mt={10} onSubmit={signInFormHandler}>
            <Stack spacing={4}>
              <Input
                type={'email'}
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
            {status === 'loading' ? (
              <Button
                isLoading
                loadingText="Loading"
                sx={submitButtonStyles}
                spinnerPlacement="start"
              >
                Submit
              </Button>
            ) : (
              <Button
                type="submit"
                fontFamily={'heading'}
                sx={submitButtonStyles}
                _hover={{
                  boxShadow: 'xl',
                }}
                _active={{
                  boxShadow: 'xl',
                }}
              >
                Login
              </Button>
            )}
          </Box>
          <Link to="/signup" className="text-underline">
            Don't have an account yet?
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}

export { Signin };
