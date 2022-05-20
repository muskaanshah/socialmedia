import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResizeTextarea from 'react-textarea-autosize';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { LinkButtonStyles } from '../../../styles/globalStyles';
import { updateOtherDetails } from '../../Home/userSlice';

function EditOtherDetails({ setOtherDetailsDiv }) {
  const { curUser } = useSelector(state => state.user);
  const [details, setDetails] = useState({
    name: curUser.name,
    bio: curUser.bio,
  });
  const dispatch = useDispatch();

  const detailsSaveHandler = async () => {
    await dispatch(
      updateOtherDetails({
        name: details.name,
        bio: details.bio,
        currentUserID: curUser.uid,
      })
    ).unwrap();
    setOtherDetailsDiv(false);
  };

  useEffect(() => {
    setDetails({
      name: curUser.name,
      bio: curUser.bio,
    });
  }, [curUser]);
  return (
    <>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          type="text"
          placeholder="Add your name"
          value={details.name}
          onChange={e => setDetails({ ...details, name: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="bio">Bio</FormLabel>
        <Textarea
          id="bio"
          minH="unset"
          placeholder="Add your bio"
          w="100%"
          resize="none"
          minRows={1}
          maxRows={4}
          maxLength="200"
          as={ResizeTextarea}
          value={details.bio}
          onChange={e => setDetails({ ...details, bio: e.target.value })}
        />
      </FormControl>
      <HStack className="mt-1" w="full" justifyContent="center">
        <Button
          type="submit"
          variant="link"
          sx={LinkButtonStyles}
          onClick={detailsSaveHandler}
        >
          Save
        </Button>
        <Button
          variant="link"
          sx={LinkButtonStyles}
          onClick={() => setOtherDetailsDiv(false)}
        >
          Cancel
        </Button>
      </HStack>
    </>
  );
}

export { EditOtherDetails };
