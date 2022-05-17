import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  followUser,
  getSingleUser,
  unFollowUser,
} from '../pages/Home/userSlice';
import { getUserObjectsInArray } from '../services';

function UserFollowStack({ user, setUserObjectArray, userList }) {
  const { currentUser } = useSelector(state => state.auth);
  const { followUnfollowStatus } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userID } = useParams();

  const unFollowUserHandler = async () => {
    await dispatch(
      unFollowUser({
        currentUserID: currentUser?.uid,
        unFollowedUserID: user?.uid,
      })
    ).unwrap();
    getUserObjectsInArray(userList, setUserObjectArray);
    if (userID === currentUser?.uid) dispatch(getSingleUser(userID));
  };

  const followUserHandler = async () => {
    await dispatch(
      followUser({
        currentUserID: currentUser?.uid,
        followedUserID: user?.uid,
      })
    ).unwrap();
    getUserObjectsInArray(userList, setUserObjectArray);
    if (userID === currentUser?.uid) dispatch(getSingleUser(userID));
  };
  return (
    <HStack justifyContent="space-between" w="full">
      <HStack
        spacing={3}
        flexGrow="1"
        cursor="pointer"
        onClick={() => navigate(`/profile/${user.uid}`)}
      >
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
              {user?.followers?.includes(currentUser?.uid) ? (
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
