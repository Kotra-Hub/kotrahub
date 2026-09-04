// src/theme/global.theme.ts

import { AppTheme } from '@/interfaces/common.interface';
import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

// Base colors
const colors = {
  // Primary brand color (turquoise/teal from header)
  primary: '#0f9d9a',
  primaryLight: '#50b3ac',
  primaryBg: '#f0fbfa',
  primaryHover: '#f1f9f8',

  // KOTRAHUB colors
  kotraText: '#111936',  // Dark navy for KOTRA
  hubText: '#0f9d9a',    // Turquoise for HUB

  // Status colors
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#0f9d9a',

  // Text colors
  textPrimary: '#111936',
  textSecondary: '#1e293b',
  textGrey: '#475569',
  textMuted: '#64748b',
  textLight: '#94a3b8',

  // Border colors
  border: '#e2e8f0',
  borderLight: '#eef2f6',

  // Background colors
  bgWhite: '#ffffff',
  bgLight: '#f8fafc',
  bgHover: '#f1f5f9',
  bgGrey: '#f1f5f9',
  bgSuccess: '#f0fdf4',
  bgError: '#fef2f2',

  // Black
  black: '#000000',
};

// Light Theme (Default: Turquoise)
const LightTheme: ThemeTypes = {
  name: AppTheme.LIGHT,
  dark: false,
  variables: {
    'border-color': colors.border,
    'carousel-control-size': 10,
  },
  colors: {
    // Primary
    primary: colors.primary,
    'on-primary': '#ffffff',
    primary200: colors.primaryLight,

    // Secondary
    secondary: colors.primary,
    'on-secondary': '#ffffff',
    secondary200: colors.primaryLight,

    // Tertiary
    tertiary: '#6fd6c9',
    'on-tertiary': '#ffffff',

    // Status
    success: colors.success,
    'on-success': '#ffffff',
    lightsuccess: '#f0fdf4',

    error: colors.error,
    'on-error': '#ffffff',
    lighterror: colors.bgError,

    warning: colors.warning,
    'on-warning': '#ffffff',
    lightwarning: '#fffbeb',

    info: colors.info,
    'on-info': '#ffffff',

    // Text
    darkText: colors.textPrimary,
    lightText: colors.textGrey,
    textSecondary: colors.textSecondary,
    textMuted: colors.textMuted,
    textGrey: colors.textGrey,

    // KOTRAHUB specific
    kotraText: colors.kotraText,
    hubText: colors.hubText,

    // Backgrounds
    containerBg: colors.bgWhite,
    surface: colors.bgWhite,
    'on-surface': colors.textPrimary,
    background: colors.bgLight,
    'on-surface-variant': colors.textMuted,
    bgLight: colors.bgLight,
    bgHover: colors.bgHover,
    bgGrey: colors.bgGrey,

    // Borders
    borderLight: colors.border,
    inputBorder: colors.border,

    // Brand variants
    darkprimary: colors.primary,
    darksecondary: colors.primary,
    darktertiary: '#6fd6c9',

    lightprimary: colors.primaryLight,
    lightsecondary: colors.primaryLight,
    lighttertiary: colors.primaryLight,

    // Social
    facebook: '#4267b2',
    twitter: '#1da1f2',
    linkedin: '#0e76a8',

    // Draft / inactive
    draft: colors.textMuted,

    // Toolbar
    toolbarBg: colors.bgWhite,
    accent: colors.primary,
    gray100: colors.bgLight,
    primaryBg: colors.primaryBg,
    primaryHover: colors.primaryHover,

    // View All Button
    viewAllBg: '#f0fbfa',
    viewAllHoverBg: '#f1f9f8',
    viewAllText: '#0f9d9a',
    viewAllBorder: '#8bd1cc',

    // Black
    black: colors.black,
  }
};

// Dark Theme (dark with turquoise accents)
const DarkTheme: ThemeTypes = {
  name: AppTheme.DARK,
  dark: true,
  variables: {
    'border-color': '#2a2a2a',
    'carousel-control-size': 10,
  },
  colors: {
    // Primary - keeping turquoise
    primary: colors.primary,
    'on-primary': '#ffffff',
    primary200: '#0f9d9a33',

    // Secondary
    secondary: colors.primary,
    'on-secondary': '#ffffff',
    secondary200: '#0f9d9a33',

    // Tertiary
    tertiary: '#6fd6c9',
    'on-tertiary': '#ffffff',

    // Status
    success: '#4ade80',
    'on-success': '#ffffff',
    lightsuccess: '#22c55e33',

    error: '#f87171',
    'on-error': '#ffffff',
    lighterror: '#ef444433',

    warning: '#fbbf24',
    'on-warning': '#ffffff',
    lightwarning: '#f59e0b33',

    info: colors.primary,
    'on-info': '#ffffff',

    // Text - lighter for dark mode
    darkText: '#f1f5f9',
    lightText: '#94a3b8',
    textSecondary: '#e2e8f0',
    textMuted: '#94a3b8',
    textGrey: '#94a3b8',

    // KOTRAHUB specific colors for dark mode
    kotraText: '#f1f5f9',
    hubText: colors.primary,

    // Backgrounds - dark
    containerBg: '#0f172a',
    surface: '#1e293b',
    'on-surface': '#f1f5f9',
    background: '#0f172a',
    'on-surface-variant': '#94a3b8',
    bgLight: '#1e293b',
    bgHover: '#2a2a2a',
    bgGrey: '#1e293b',

    // Borders
    borderLight: '#2a2a2a',
    inputBorder: '#3a3a3a',

    // Brand variants
    darkprimary: colors.primary,
    darksecondary: colors.primary,
    darktertiary: '#6fd6c9',

    lightprimary: '#0f9d9a22',
    lightsecondary: '#0f9d9a22',
    lighttertiary: '#6fd6c922',

    // Social
    facebook: '#4267b2',
    twitter: '#1da1f2',
    linkedin: '#0e76a8',

    // Draft
    draft: '#94a3b8',

    // Toolbar
    toolbarBg: '#0f172a',

    // View All Button
    viewAllBg: '#183c3b',
    viewAllHoverBg: '#20504e',
    viewAllText: '#ffffff',
    viewAllBorder: '#6fd6c9',

    // Additional
    accent: colors.primary,
    gray100: '#1e293b',
    primaryBg: '#0f9d9a22',
    primaryHover: '#0f9d9a33',

    // Black
    black: colors.black,
  }
};

export { LightTheme, DarkTheme };
