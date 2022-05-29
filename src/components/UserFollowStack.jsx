import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { followUser, unFollowUser } from '../pages/Home/userSlice';

function UserFollowStack({ user, setUserObjectArray, userList, onClick }) {
  const { currentUser } = useSelector(state => state.auth);
  const { curUser } = useSelector(state => state.user);
  const { followUnfollowStatus } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentLocation = pathname.split('/').slice(1);
  const unFollowUserHandler = async () => {
    await dispatch(
      unFollowUser({
        currentUserID: currentUser?.uid,
        unFollowedUserID: user?.uid,
        currentLocation,
      })
    ).unwrap();
  };

  const followUserHandler = async () => {
    await dispatch(
      followUser({
        currentUserID: currentUser?.uid,
        followedUserID: user?.uid,
        currentLocation,
      })
    ).unwrap();
  };
  return (
    <HStack justifyContent="space-between" w="full">
      <HStack spacing={3} flexGrow="1" cursor="pointer" onClick={onClick}>
        <Avatar name={user.name} src={user.photoURL} size="md" />
        <VStack align="flex-start">
          <Text fontSize="1rem">{user.name}</Text>
          <Text fontSize="1rem" className="mt-0" color="gray.500">
            @{user.username}
          </Text>
        </VStack>
      </HStack>
      {followUnfollowStatus === 'loading' ? (
        <Spinner />
      ) : (
        <>
          {user?.uid === currentUser?.uid ? (
            <Box />
          ) : (
            <>
              {curUser?.following?.includes(user?.uid) ? (
                <Button
                  variant="link"
                  _focus={{ border: 'none' }}
                  onClick={unFollowUserHandler}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="link"
                  _focus={{ border: 'none' }}
                  onClick={followUserHandler}
                >
                  Follow
                </Button>
              )}
            </>
          )}
        </>
      )}
    </HStack>
  );
}

export { UserFollowStack };
