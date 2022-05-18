import { useDispatch, useSelector } from 'react-redux';
import {
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { deletePost, getPostByUserId } from '../pages/Home/postSlice';
import { getAllUsers } from '../pages/Home/userSlice';
import { EditPostModal } from './EditPostModal';

const functionButtonStyles = {
  w: 'full',
  justify: 'flex-start',
  spacing: '2',
  cursor: 'pointer',
  _hover: { background: 'blackAlpha.300' },
  px: '3',
  py: '2',
};

function EditDeletePopover({ id, type, desc }) {
  const { currentUser } = useSelector(state => state.auth);
  const { deleteStatus } = useSelector(state => state.post);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const deleteHandler = async () => {
    if (type === 'post') {
      await dispatch(
        deletePost({ postID: id, currentUserId: currentUser.uid })
      ).unwrap();
      dispatch(getAllUsers());
      dispatch(getPostByUserId(currentUser.uid));
    }
  };

  return (
    <>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Search database"
            _focus={{ border: 'none' }}
            background="transparent"
            _hover={{ background: 'transparent' }}
            _active={{ background: 'transparent' }}
            color="inherit"
            icon={<span className="material-icons-outlined">more_vert</span>}
          />
        </PopoverTrigger>
        <PopoverContent w="40" _focus={{ border: 'none' }}>
          <PopoverArrow />
          <PopoverBody px="0">
            <VStack spacing="0">
              <HStack sx={functionButtonStyles} onClick={onOpen}>
                <span className="material-icons-outlined">edit</span>
                <Text fontSize="1rem">Edit</Text>
              </HStack>
              {deleteStatus === 'loading' ? (
                <HStack color="red.400" sx={functionButtonStyles}>
                  <span className="material-icons-outlined">delete</span>
                  <Text fontSize="1rem">Deleting...</Text>
                </HStack>
              ) : (
                <HStack
                  color="red.400"
                  sx={functionButtonStyles}
                  onClick={deleteHandler}
                >
                  <span className="material-icons-outlined">delete</span>
                  <Text fontSize="1rem">Delete</Text>
                </HStack>
              )}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <EditPostModal
        isOpen={isOpen}
        onClose={onClose}
        postID={id}
        desc={desc}
      />
    </>
  );
}

export { EditDeletePopover };
