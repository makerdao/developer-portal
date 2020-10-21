import makerTheme from '@makerdao/dai-ui-theme-maker-neue';
import { icons as standardIcons } from '@makerdao/dai-ui-icons';
import { icons as brandIcons } from '@makerdao/dai-ui-icons-branding';

const icons = { ...standardIcons, ...brandIcons };

const theme = {
  ...makerTheme,
  icons,

  colors: {
    ...makerTheme.colors,
    background: '#212',
    surface: '#ffffff08',
    text: '#fffff0',
    onBackground: '#eaebf0',
    primary: '#F012BE',

    muted: '#ffffff08',
    mutedAlt: '#5a495c',
    onBackgroundAlt: '#e1dfec',
    onBackgroundMuted: '#ffffff99',
    onSurface: '#ABA8bc',
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
      fontSize: [9, 10],
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
      fontSize: 1,
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
