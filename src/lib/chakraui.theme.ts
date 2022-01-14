import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
} as ThemeConfig;

export const theme = extendTheme({ config });
