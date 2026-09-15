import { AppTheme } from '@/interfaces/common.interface';
import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const DarkTheme: ThemeTypes = {
  name: AppTheme.DARK,
  dark: true,
  variables: {
    'border-color': '#334155',
    'carousel-control-size': 10
  },
  colors: {
    background: '#0B1424',
    'on-background': '#F8FAFC',
    'on-surface': '#F8FAFC',
    primary: '#00B8B8',
    secondary: '#A0C626',
    tertiary: '#FDF101',
    info: '#03c9d7',
    success: '#00c853',
    accent: '#FFAB91',
    warning: '#FDF101',
    error: '#f44336',
    draft: '#64748B',
    lightprimary: '#24344D',
    lightsecondary: '#1D2B42',
    lighttertiary: '#A0C626',
    lightsuccess: '#b9f6ca',
    lighterror: '#f9d8d8',
    lightwarning: '#FDF101',
    darkText: '#F8FAFC',
    lightText: '#F44336',
    darkprimary: '#058C43',
    darksecondary: '#A0C626',
    darktertiary: '#FDF101',
    borderLight: '#334155',
    inputBorder: '#787878',
    containerBg: '#0B1424',
    surface: '#172338',
    'on-surface-variant': '#CBD5E1',
    facebook: '#4267b2',
    twitter: '#1da1f2',
    linkedin: '#0e76a8',
    gray100: '#1D2B42',
    primary200: '#90caf9',
    secondary200: '#b39ddb',
    toolbarBg: '#111C2F'
  }
};

export { DarkTheme };
