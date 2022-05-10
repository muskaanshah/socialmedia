import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
} from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  gray: {
    900: '#1E1F21',
    800: '#393A3C',
    700: '#555658',
    600: '#707173',
    500: '#8C8D8E',
    400: '#A7A8A9',
    300: '#C2C3C5',
    200: '#A7A8A9',
    100: '#fdfdfd',
  },
};

const fonts = {
  heading: `Roboto, ${base.fonts?.heading}`,
  body: `Roboto, ${base.fonts?.body}`,
};

const styles = {
  global: props => ({
    'html, body': {
      bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
    },
  }),
};

export const theme = extendTheme(
  {
    colors,
    fonts,
    config,
    styles,
  },
  withDefaultColorScheme({
    colorScheme: 'blue',
    components: ['Button'],
  })
);
