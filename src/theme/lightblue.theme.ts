import { AppTheme } from '@/interfaces/common.interface';
import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const LightBlueTheme: ThemeTypes = {
  name: AppTheme.LIGHT_BLUE,
  dark: false,
  variables: {
    'border-color': '#6A5FFF',
    'carousel-control-size': 10
  },
  colors: {
    primary: '#6A5FFF',
    'on-primary': '#FFFFFF',
    secondary: '#5182FF',
    'on-secondary': '#FFFFFF',
    tertiary: '#08B4EF',
    'on-tertiary': '#FFFFFF',
    info: '#03C9D7',
    'on-info': '#000000',
    success: '#00C853',
    'on-success': '#FFFFFF',
    accent: '#FFAB91',
    draft: '#94A3B8',
    warning: '#FF9913',
    'on-warning': '#000000',
    error: '#F44336',
    'on-error': '#FFFFFF',
    lightprimary: '#EEF2F6',
    lightsecondary: '#EDE7F6',
    lighttertiary: '#5182FF',
    lightsuccess: '#B9F6CA',
    lighterror: '#F9D8D8',
    lightwarning: '#FFAD00',
    darkText: '#212121',
    lightText: '#334155',
    darkprimary: '#0E1438',
    darksecondary: '#0E1438',
    darktertiary: '#938728',
    borderLight: '#D0D0D0',
    inputBorder: '#787878',
    containerBg: '#EEF2F6',
    surface: '#FFFFFF',
    'on-surface': '#212121',
    'on-surface-variant': '#334155',
    facebook: '#4267B2',
    twitter: '#1DA1F2',
    linkedin: '#0E76A8',
    gray100: '#E1E1E1',
    primary200: '#90CAF9',
    secondary200: '#B39DDB',
    toolbarBg: '#6A5FFF'
  }
};

export { LightBlueTheme };
