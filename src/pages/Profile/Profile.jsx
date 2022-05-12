import {
  Avatar,
  Box,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FeedPost } from '../../components';
import { TopBar } from './components/TopBar';

function Profile() {
  return (
    <Box sx={{ flexGrow: '1' }}>
      <TopBar />
      <Image
        minW="full"
        h="15rem"
        src="https://picsum.photos/300"
        alt="banner"
      />
      <HStack p={4} spacing={4} align="flex-start">
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size={useBreakpointValue({
            base: 'md',
            sm: 'lg',
            md: 'xl',
            xl: '2xl',
          })}
        />
        <VStack align="flex-start">
          <Text fontWeight="500" fontSize="xl">
            Muskaan Shah
          </Text>
          <Text color="gray.500" fontSize="sm" className="mt-0">
            @muskaan__shah
          </Text>
          <Text fontSize="sm">
            Here's my short description, Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Placeat quisquam possimus qui cumque reprehenderit
            molestias unde? Reiciendis assumenda, repellat asperiores tempo
          </Text>
          <HStack spacing={8} w="full">
            <Text>
              53{' '}
              <Text as={'span'} fontWeight="300">
                Posts
              </Text>
            </Text>
            <Text>
              293{' '}
              <Text as={'span'} fontWeight="300">
                Followers
              </Text>
            </Text>
            <Text>
              415{' '}
              <Text as={'span'} fontWeight="300">
                Following
              </Text>
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Divider />
      <FeedPost />
      <FeedPost />
      <FeedPost />
      <FeedPost />
      <FeedPost />
    </Box>
  );
}

export { Profile };
