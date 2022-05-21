import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, FormLabel, HStack, Input } from '@chakra-ui/react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase';
import {
  FormLabelStyles,
  LinkButtonStyles,
  UploadButton,
} from '../../../styles/globalStyles';
import { updateProfileImage } from '../../Home/userSlice';

function EditProfileImage({ setAvatarDiv }) {
  const { curUser, avatarStatus } = useSelector(state => state.user);
  const [avatarImg, setAvatarImg] = useState({
    image: curUser.photoURL,
    URL: curUser.photoURL,
  });
  const dispatch = useDispatch();
  const avatarFile = useRef();
  const avatarChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarImg({
        ...avatarImg,
        image: URL.createObjectURL(e.target.files[0]),
        URL: e.target.files[0],
      });
    }
  };

  const headerSaveHandler = async () => {
    const avatarRef = ref(storage, `${curUser.uid}/${avatarImg.URL.name}`);
    const avatarSnapshot = await uploadBytes(avatarRef, avatarImg.URL);
    const avatarDownloadURL = await getDownloadURL(avatarSnapshot.ref);
    await dispatch(
      updateProfileImage({
        photoURL: avatarDownloadURL,
        currentUserID: curUser.uid,
      })
    ).unwrap();
    setAvatarDiv(false);
  };
  return (
    <>
      <HStack>
        <Avatar name={curUser.name} src={avatarImg.image} size="md" />
        <Button sx={UploadButton} variant="link">
          <FormLabel sx={FormLabelStyles} fontWeight="400">
            <Input
              type="file"
              accept="image/*"
              ref={avatarFile}
              onChange={avatarChange}
            />
            Edit Avatar
          </FormLabel>
        </Button>
      </HStack>
      <HStack className="mt-1" w="full" justifyContent="center">
        {avatarStatus === 'loading' ? (
          <Button
            isLoading
            loadingText="Saving"
            variant="outline"
            _focus={{ border: 'none' }}
          >
            Saving
          </Button>
        ) : (
          <>
            <Button
              type="submit"
              variant="link"
              sx={LinkButtonStyles}
              onClick={headerSaveHandler}
            >
              Save
            </Button>
            <Button
              variant="link"
              sx={LinkButtonStyles}
              onClick={() => setAvatarDiv(false)}
            >
              Cancel
            </Button>
          </>
        )}
      </HStack>
    </>
  );
}

export { EditProfileImage };
