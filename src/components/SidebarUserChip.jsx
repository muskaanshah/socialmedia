import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react';
import {
  followUser,
  getAllUsers,
  getCurrentUserDetails,
} from '../pages/Home/userSlice';

function SidebarUserChip({ user }) {
  const { currentUser } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      <Button
        variant="link"
        _focus={{ border: 'none' }}
        onClick={async () => {
          await dispatch(
            followUser({
              currentUserID: currentUser.uid,
              followedUserID: user.uid,
            })
          ).unwrap();
          dispatch(getCurrentUserDetails(currentUser.uid));
        }}
      >
        Follow
      </Button>
    </HStack>
  );
}

export { SidebarUserChip };
