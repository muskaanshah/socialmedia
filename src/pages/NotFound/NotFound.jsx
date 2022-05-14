import { Center, Image } from '@chakra-ui/react';
import { error404 } from '../../assets';

function NotFound() {
  return (
    <Center height="100vh">
      <Image boxSize="400px" objectFit="cover" src={error404} alt="404 error" />{' '}
    </Center>
  );
}

export { NotFound };
