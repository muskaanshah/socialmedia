import { useDispatch, useSelector } from 'react-redux';
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
import {
  followUser,
  getAllUsers,
  getSingleUser,
  unFollowUser,
} from '../../Home/userSlice';
import { EditProfile } from './EditProfile';
import { SettingsModal } from './SettingsModal';

const buttonStyles = {
  py: '0',
  h: '8',
  w: '28',
  _focus: { border: 'none' },
  fontWeight: '400',
};
function ProfileDescription() {
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
  const { currentUser } = useSelector(state => state.auth);
  const { singleUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const unFollowUserHandler = async () => {
    await dispatch(
      unFollowUser({
        currentUserID: currentUser?.uid,
        unFollowedUserID: singleUser?.uid,
      })
    ).unwrap();
    dispatch(getAllUsers());
    dispatch(getSingleUser(singleUser.uid));
  };

  const followUserHandler = async () => {
    await dispatch(
      followUser({
        currentUserID: currentUser?.uid,
        followedUserID: singleUser?.uid,
      })
    ).unwrap();
    dispatch(getAllUsers());
    dispatch(getSingleUser(singleUser.uid));
  };
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
          name={singleUser?.name}
          src={singleUser?.photoURL}
          size={useBreakpointValue({
            base: 'md',
            sm: 'lg',
            md: 'xl',
            xl: '2xl',
          })}
        />
        <VStack align="flex-start" w="full">
          <HStack w="full" justify="space-between">
            <VStack align="flex-start">
              <Text fontWeight="500" fontSize="xl">
                {singleUser?.name}
              </Text>
              <Text color="gray.500" fontSize="sm" className="mt-0">
                @{singleUser?.username}
              </Text>
            </VStack>
            <>
              {/* Either of these three buttons based on conditional rendering */}
              {singleUser?.uid === currentUser?.uid ? (
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
              ) : (
                <>
                  {singleUser?.followers?.includes(currentUser?.uid) ? (
                    <Button
                      sx={buttonStyles}
                      variant="outline"
                      onClick={unFollowUserHandler}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button sx={buttonStyles} onClick={followUserHandler}>
                      Follow
                    </Button>
                  )}
                </>
              )}
            </>
          </HStack>
          <Text fontSize="sm">{singleUser?.bio}</Text>
          <HStack spacing={8} w="full">
            <Text>
              {`${singleUser?.posts?.length} `}
              <Text as={'span'} fontWeight="300">
                Posts
              </Text>
            </Text>
            <Text cursor="pointer" onClick={followersListOnOpen}>
              {`${singleUser?.followers?.length} `}
              <Text as={'span'} fontWeight="300">
                Followers
              </Text>
            </Text>
            <Text cursor="pointer" onClick={followingListOnOpen}>
              {`${singleUser?.following?.length} `}
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
        followers={singleUser.followers}
      />
      <FollowingList
        isOpen={followingListIsOpen}
        onClose={followingListOnClose}
      />
    </>
  );
}

export { ProfileDescription };
