import makerTheme from '@makerdao/dai-ui-theme-maker-neue';
import icons from './icons';

const theme = {
  ...makerTheme,
  useColorSchemeMediaQuery: true,

  icons,

  colors: {
    ...makerTheme.colors,

    modes: {
      dark: {
        background: '#3E113F',
        surface: '#340F35',
        // surface: '#ffffff08',
        text: '#EAEBF0',
        textMuted: '#907B90',
        // text: '#fffff0',
        onBackground: '#EAEBF0',
        primary: '#F34181',
        primaryEmphasis: '#F34181F2',
        primaryMuted: '#F34181E6',
        primaryAlt: '#F34181D9',

        // primary: '#F012BE',
        muted: '#694769',
        // muted: '#ffffff08',
        mutedAlt: '#694769',
        onBackgroundAlt: '#EAEBF0',
        // onBackgroundAlt: '#e1dfec',
        onBackgroundMuted: '#CFC3CF',
        onSurface: '#ABA8bc',
      },
    },
  },

  fonts: {
    body: 'Inconsolata, sans-serif',
    heading:
      "'FT Base',-apple-system,system-ui,BlinkMacSystemFont,'SF Pro Text','Segoe UI',Roboto,Helvetica,Arial,sans-serif",
    monospace: 'monospace',
  },

  text: {
    ...makerTheme.text,
    megaHeading: {
      variant: 'text.heading',
      fontSize: [8, 10],
    },
    largeText: {
      fontSize: 5,
      color: 'text',
    },
    caps: {
      ...makerTheme.text.caps,
      fontFamily: 'heading',
      fontWeight: 'body',
    },
    plainText: {
      fontFamily: 'heading',
      fontWeight: 'body',
      fontSize: 5,
    },
  },

  links: {
    ...makerTheme.links,
    nav: {
      ...makerTheme.links.nav,
      fontFamily: 'heading',
    },
    sidebar: {
      variant: 'links.nav',
      fontSize: 1, // DELETE if not needed
    },
    infobar: {
      variant: 'links.nav',
      color: 'onBackgroundMuted',
      fontSize: 1,
      '&:hover': {
        color: 'text',
      },
      // '&:active': {
      //   color: 'text',
      // },
      '&:focus': {
        color: 'text',
      },
    },
  },
  cards: {
    primary: {
      ...makerTheme.cards.primary,
      border: '',
    },
  },
  buttons: {
    ...makerTheme.buttons,
    contrastButtonSmall: {
      variant: 'buttons.small',
      bg: 'onBackgroundAlt',
      color: 'background',
      '&:hover': {
        bg: 'primary',
        color: 'onPrimary',
      },
      '&:active': {
        bg: 'primary',
        color: 'onPrimary',
      },
    },
  },
  forms: {
    ...makerTheme.forms,
    contrastTextarea: {
      color: 'background',
      bg: 'onBackgroundAlt',
    },
    select: {
      color: 'primary',
      fontWeight: 'bold',
      border: 'none',
      borderColor: (theme) => `transparent transparent ${theme.colors.text} transparent`,
      '&:focus': {
        color: 'primary',
        borderColor: 'transparent',
        outline: 'none',
      },
    },
  },
  images: {
    ...makerTheme.images,
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 99999,
    },
  },
  styles: {
    ...makerTheme.styles,
    fakeLi: {
      listStyle: 'none',
    },

    h1: {
      ...makerTheme.styles.h1,
      mt: 4,
    },

    a: {
      color: 'primary',
      textDecoration: 'none',
      '&:hover': {
        color: 'primaryEmphasis',
      },
    },
    ul: {
      pl: 4,
    },
    pre: {
      bg: 'background',
      m: 0,
    },
    code: {
      ...makerTheme.styles.code,
      p: 0,
      m: 0,
    },
    // applies to single-backticks
    inlineCode: {
      fontFamily: 'monospace',
      fontSize: 3,
      bg: 'primaryMuted',
      color: 'primaryAlt',
      px: 1,
    },
  },
};

export default theme;
