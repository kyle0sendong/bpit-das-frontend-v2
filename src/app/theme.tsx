import {
  createTheme,
  CSSVariablesResolver,
  rem,
} from '@mantine/core';

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-hero-height': theme.other.heroHeight,
    '--testing': theme.other.deepOrangeDark,
    '--color1': '#0b8367',
    '--color2': '#4d7591',
    '--color3': '#7bbcad',
  },
  light: {
    '--mantine-color-deep-orange': theme.other.deepOrangeLight,

  },
  dark: {
    '--mantine-color-deep-orange': theme.other.deepOrangeDark,
  },
  
});

export const theme = createTheme({
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  
  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },

  other: {
    deepOrangeLight: '#E17900',
    deepOrangeDark: '#FC8C0C',
    heroHeight: rem(400),
  },

})
