import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Center,
  FormLabel,
  HStack,
  Image,
  Input,
} from '@chakra-ui/react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase';
import {
  FormLabelStyles,
  LinkButtonStyles,
  UploadButton,
} from '../../../styles/globalStyles';
import { updateHeaderImage } from '../../Home/userSlice';

function EditHeaderImage({ setHeaderDiv }) {
  const { curUser } = useSelector(state => state.user);
  const [bannerImg, setBannerImg] = useState({
    image: curUser.headerImage,
    URL: curUser.headerImage,
  });
  const dispatch = useDispatch();
  const bannerFile = useRef();
  const bannerChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerImg({
        ...bannerImg,
        image: URL.createObjectURL(e.target.files[0]),
        URL: e.target.files[0],
      });
    }
  };

  const headerSaveHandler = async () => {
    const headerRef = ref(storage, `${curUser.uid}/${bannerImg.URL.name}`);
    const headerSnapshot = await uploadBytes(headerRef, bannerImg.URL);
    const headerDownloadURL = await getDownloadURL(headerSnapshot.ref);
    await dispatch(
      updateHeaderImage({
        headerImage: headerDownloadURL,
        currentUserID: curUser.uid,
      })
    ).unwrap();
    setHeaderDiv(false);
  };
  return (
    <>
      <Box pos="relative" w="full">
        <Image
          minW="full"
          h="8rem"
          src={bannerImg.image}
          alt="banner"
          fallbackSrc="https://via.placeholder.com/500"
        />
        <Center pos="absolute" inset={0} bg="blackAlpha.500">
          <Button sx={UploadButton} variant="ghost">
            <FormLabel sx={FormLabelStyles}>
              <Input
                type="file"
                accept="image/*"
                ref={bannerFile}
                onChange={bannerChange}
              />
              <span className="material-icons-outlined">add_a_photo</span>
            </FormLabel>
          </Button>
        </Center>
      </Box>
      <HStack className="mt-1" w="full" justifyContent="center">
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
          onClick={() => setHeaderDiv(false)}
        >
          Cancel
        </Button>
      </HStack>
    </>
  );
}

export { EditHeaderImage };
