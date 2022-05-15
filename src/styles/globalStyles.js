const TopBarStyles = {
  display: 'flex',
  px: '4',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'sticky',
  top: '0',
  h: { base: '14', md: '16' },
  backdropFilter: 'auto',
  backdropBlur: '8px',
  zIndex: 'docked',
};

const CloseButtonBlack = {
  variant: 'ghost',
  pos: 'absolute',
  top: '0',
  right: '0',
  w: '20px',
  minW: '20px',
  h: '20px',
  minH: '20px',
  size: 'sm',
  color: 'white',
  p: '0',
  borderRadius: 'full',
  backgroundColor: 'blackAlpha.500',
  _focus: { border: 'none' },
};

const AuthInputStyles = {
  bg: 'gray.100',
  border: '0',
  color: 'gray.800',
};

export { TopBarStyles, CloseButtonBlack, AuthInputStyles };
