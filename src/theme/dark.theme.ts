import { AppTheme } from '@/interfaces/common.interface';
import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const DarkTheme: ThemeTypes = {
  name: AppTheme.DARK,
  dark: true,
  variables: {
    'border-color': '#008842',
    'carousel-control-size': 10
  },
  colors: {
    primary: '#008842',
    secondary: '#A0C626',
    tertiary: '#FDF101',
    info: '#03c9d7',
    success: '#00c853',
    accent: '#FFAB91',
    warning: '#FDF101',
    error: '#f44336',
    draft: '#64748B',
    lightprimary: '#424242',
    lightsecondary: '#2A2A2A',
    lighttertiary: '#A0C626',
    lightsuccess: '#b9f6ca',
    lighterror: '#f9d8d8',
    lightwarning: '#FDF101',
    darkText: '#212121',
    lightText: '#F44336',
    darkprimary: '#058C43',
    darksecondary: '#A0C626',
    darktertiary: '#FDF101',
    borderLight: '#2A2A2A',
    inputBorder: '#787878',
    containerBg: '#424242',
    surface: '#2A2A2A',
    'on-surface-variant': '#2A2A2A',
    facebook: '#4267b2',
    twitter: '#1da1f2',
    linkedin: '#0e76a8',
    gray100: '#2A2A2A',
    primary200: '#90caf9',
    secondary200: '#b39ddb',
    toolbarBg: '#2A2A2A'
  }
};

export { DarkTheme };
