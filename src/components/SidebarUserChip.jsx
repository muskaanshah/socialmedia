import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { followUser, getCurrentUserDetails } from '../pages/Home/userSlice';

function SidebarUserChip({ user }) {
  const { currentUser } = useSelector(state => state.auth);
  const { followUnfollowStatus } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentLocation = pathname.split('/').slice(1);
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
        <Button
          variant="link"
          _focus={{ border: 'none' }}
          onClick={async () => {
            await dispatch(
              followUser({
                currentUserID: currentUser.uid,
                followedUserID: user.uid,
                currentLocation,
              })
            ).unwrap();
            // dispatch(getCurrentUserDetails(currentUser.uid));
          }}
        >
          Follow
        </Button>
      )}
    </HStack>
  );
}

export { SidebarUserChip };
