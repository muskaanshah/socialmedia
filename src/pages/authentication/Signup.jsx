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
import { CommonHeader } from './components/CommonHeader';

function Signup() {
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
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                type="text"
                placeholder="Full Name"
                bg={'gray.100'}
                border={0}
                color={'gray.800'}
                _placeholder={{
                  color: 'gray.800',
                }}
                required
              />
              <Input
                type="text"
                placeholder="Username"
                bg={'gray.100'}
                border={0}
                color={'gray.800'}
                _placeholder={{
                  color: 'gray.800',
                }}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                bg={'gray.100'}
                border={0}
                color={'gray.800'}
                _placeholder={{
                  color: 'gray.800',
                }}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                bg={'gray.100'}
                border={0}
                color={'gray.800'}
                _placeholder={{
                  color: 'gray.800',
                }}
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
