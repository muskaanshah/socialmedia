import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FollowersList, FollowingList } from '../../../components';
import { EditProfile } from './EditProfile';
import { SettingsModal } from './SettingsModal';

function ProfileDescription() {
  const buttonStyles = {
    py: '0',
    h: '8',
    w: '28',
    _focus: { border: 'none' },
    fontWeight: '400',
  };
  const {
    isOpen: editProfileIsOpen,
    onOpen: editProfileOnOpen,
    onClose: editProfileOnClose,
  } = useDisclosure();
  const {
    isOpen: settingsIsOpen,
    onOpen: settingsOnOpen,
    onClose: settingsOnClose,
  } = useDisclosure();
  const {
    isOpen: followersListIsOpen,
    onOpen: followersListOnOpen,
    onClose: followersListOnClose,
  } = useDisclosure();
  const {
    isOpen: followingListIsOpen,
    onOpen: followingListOnOpen,
    onClose: followingListOnClose,
  } = useDisclosure();
  return (
    <>
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
          <HStack w="full" justify="space-between">
            <VStack align="flex-start">
              <Text fontWeight="500" fontSize="xl">
                Muskaan Shah
              </Text>
              <Text color="gray.500" fontSize="sm" className="mt-0">
                @muskaan__shah
              </Text>
            </VStack>
            <>
              {/* Either of these three buttons based on conditional rendering */}
              <Button sx={buttonStyles} variant="outline">
                Unfollow
              </Button>
              <HStack spacing={4}>
                <Button
                  sx={buttonStyles}
                  variant="outline"
                  onClick={editProfileOnOpen}
                >
                  Edit Profile
                </Button>
                <Box
                  display="inline-block"
                  cursor="pointer"
                  onClick={settingsOnOpen}
                >
                  <span className="material-icons-outlined">settings</span>
                </Box>
              </HStack>
              <Button sx={buttonStyles}>Follow</Button>
            </>
          </HStack>
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
            <Text cursor="pointer" onClick={followersListOnOpen}>
              293{' '}
              <Text as={'span'} fontWeight="300">
                Followers
              </Text>
            </Text>
            <Text cursor="pointer" onClick={followingListOnOpen}>
              415{' '}
              <Text as={'span'} fontWeight="300">
                Following
              </Text>
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <EditProfile isOpen={editProfileIsOpen} onClose={editProfileOnClose} />
      <SettingsModal isOpen={settingsIsOpen} onClose={settingsOnClose} />
      <FollowersList
        isOpen={followersListIsOpen}
        onClose={followersListOnClose}
      />
      <FollowingList
        isOpen={followingListIsOpen}
        onClose={followingListOnClose}
      />
    </>
  );
}

export { ProfileDescription };
