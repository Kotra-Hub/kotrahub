import { AppTheme } from '@/interfaces/common.interface';
import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const LightTheme: ThemeTypes = {
  name: AppTheme.LIGHT,
  dark: false,
  variables: {
    'border-color': '#008842',
    'carousel-control-size': 10
  },
  colors: {
    primary: '#008842',
    secondary: '#A0C626',
    tertiary: '#FDF101',
    info: '#A0C626',
    success: '#00c853',
    accent: '#FF898B',
    warning: '#FDF101',
    error: '#f44336',
    draft: '#94A3B8',
    lightprimary: '#eef2f6',
    lightsecondary: '#ede7f6',
    lighttertiary: '#A0C626',
    lightsuccess: '#b9f6ca',
    lighterror: '#f9d8d8',
    lightwarning: '#FDF101',
    darkText: '#212121',
    lightText: '#616161',
    darkprimary: '#058C43',
    darksecondary: '#A0C626',
    darktertiary: '#FDF101',
    borderLight: '#d0d0d0',
    inputBorder: '#787878',
    containerBg: '#eef2f6',
    surface: '#fff',
    'on-surface-variant': '#fff',
    facebook: '#4267b2',
    twitter: '#1da1f2',
    linkedin: '#0e76a8',
    gray100: '#fafafa',
    primary200: '#90caf9',
    secondary200: '#bba3e7',
    toolbarBg: '#E0F0E8'
  }
};

export { LightTheme };
