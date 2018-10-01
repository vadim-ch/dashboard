export module schema {
  export module brand {
    export const MARVEL = {
      light: '#85D7FF',
      'default': '#1FB6FF',
      dark: '#009EEB'
    };

    export const PURPLE = {
      light: '#A389F4',
      'default': '#7E5BEF',
      dark: '#592DEA'
    };

    export const PINK = {
      light: '#FF7CE5',
      'default': '#FF49DB',
      dark: '#FF16D1'
    };

    export const ORANGE = {
      light: '#FF9E7C',
      'default': '#FF7849',
      dark: '#FF5216'
    };

    export const GREEN = {
      light: '#29EB7F',
      'default': '#13CE66',
      dark: '#0F9F4F'
    };

    export const YELLOW = {
      light: '#FFD55F',
      'default': '#FFC82C',
      dark: '#F8B700'
    };
  }

  export module theme {
    export const BLACK = '#1F2D3D';
    export const STEEL = '#273444';
    export const SLATE = '#3C4858';
    export const SILVER = '#8492A6';
    export const SMOKE = '#E0E6ED';
    export const DARK_SMOKE = '#D3DCE6';
    export const EXTRA_DARK_SMOKE = '#C0CCDA';
    export const SNOW = '#F9FAFC';
    export const DARK_SNOW = '#E5E9F2';
    export const EXTRA_DARK_SNOW = '#E5E9F2';
  }

  export module state {
    export const BLUE = '#1FB6FF';
    export const POSITIVE = '#13CE66';
    export const NEGATIVE = '#FF4949';
    export const WARNING = '#FFC82C';
  }

  export module theme {
    export enum Theme {
      LIGHT,
      DARK
    }

    export let theme: Theme = Theme.LIGHT;

    export const toggleTheme = (): void => {
      theme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    }
  }
}
