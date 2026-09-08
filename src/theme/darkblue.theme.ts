import { AppTheme } from '@/interfaces/common.interface';
import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const DarkBlueTheme: ThemeTypes = {
  name: AppTheme.DARK,
  dark: true,
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
    draft: '#64748B',
    warning: '#FF9913',
    'on-warning': '#000000',
    error: '#F44336',
    'on-error': '#FFFFFF',
    lightprimary: '#161D49',
    lightsecondary: '#0E1438',
    lighttertiary: '#5182FF',
    lightsuccess: '#B9F6CA',
    lighterror: '#F9D8D8',
    lightwarning: '#FFAD00',
    darkText: '#212121',
    lightText: '#FFFFFF',
    darkprimary: '#6A5FFF',
    darksecondary: '#5182FF',
    darktertiary: '#938728',
    borderLight: '#161D49',
    inputBorder: '#BCBECB',
    containerBg: '#0E1438',
    surface: '#161D49',
    'on-surface': '#FFFFFF',
    'on-surface-variant': '#94A3B8',
    facebook: '#4267B2',
    twitter: '#1DA1F2',
    linkedin: '#0E76A8',
    gray100: '#1f2650',
    primary200: '#90CAF9',
    secondary200: '#B39DDB',
    toolbarBg: '#6A5FFF'
  }
};

export { DarkBlueTheme };
