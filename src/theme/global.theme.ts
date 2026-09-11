// src/theme/global.theme.ts

import { AppTheme } from '@/interfaces/common.interface';
import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

type Mode = 'light' | 'dark';

// COLORS
const colors = {
  // Primary
  primary:             { light: '#0f9d9a', dark: '#0f9d9a' },
  'on-primary':        { light: '#ffffff', dark: '#ffffff' },
  primary200:          { light: '#50b3ac', dark: '#0f9d9a33' },

  // Secondary
  secondary:           { light: '#0f9d9a', dark: '#0f9d9a' },
  'on-secondary':      { light: '#ffffff', dark: '#ffffff' },
  secondary200:        { light: '#50b3ac', dark: '#0f9d9a33' },

  // Tertiary
  tertiary:            { light: '#6fd6c9', dark: '#6fd6c9' },
  'on-tertiary':       { light: '#ffffff', dark: '#ffffff' },

  // Status
  success:             { light: '#22c55e', dark: '#4ade80' },
  'on-success':        { light: '#ffffff', dark: '#ffffff' },
  lightsuccess:        { light: '#f0fdf4', dark: '#22c55e33' },

  error:               { light: '#ef4444', dark: '#f87171' },
  'on-error':          { light: '#ffffff', dark: '#ffffff' },
  lighterror:          { light: '#fef2f2', dark: '#ef444433' },

  warning:             { light: '#f59e0b', dark: '#fbbf24' },
  'on-warning':        { light: '#ffffff', dark: '#ffffff' },
  lightwarning:        { light: '#fffbeb', dark: '#f59e0b33' },

  info:                { light: '#0f9d9a', dark: '#0f9d9a' },
  'on-info':           { light: '#ffffff', dark: '#ffffff' },

  // Text
  darkText:            { light: '#111936', dark: '#f1f5f9' },
  lightText:           { light: '#475569', dark: '#94a3b8' },
  textSecondary:       { light: '#1e293b', dark: '#e2e8f0' },
  textMuted:           { light: '#64748b', dark: '#94a3b8' },
  textGrey:            { light: '#475569', dark: '#94a3b8' },

  // KOTRAHUB
  kotraText:           { light: '#111936', dark: '#f1f5f9' },
  hubText:             { light: '#0f9d9a', dark: '#0f9d9a' },

  // Backgrounds
  containerBg:         { light: '#ffffff', dark: '#0f172a' },
  surface:             { light: '#ffffff', dark: '#1e293b' },
  'on-surface':        { light: '#111936', dark: '#f1f5f9' },
  background:          { light: '#f8fafc', dark: '#0f172a' },
  'on-surface-variant':{ light: '#64748b', dark: '#94a3b8' },
  bgLight:             { light: '#f8fafc', dark: '#1e293b' },
  bgHover:             { light: '#f1f5f9', dark: '#2a2a2a' },
  bgGrey:              { light: '#f1f5f9', dark: '#1e293b' },
  bmBg:                { light: '#f8fafc', dark: 'rgba(255,255,255,0.1)' },

  // Settings
  settingBg:           { light: '#f8fafc', dark: '#1e293b' },
  settingItemHover:    { light: '#f1f5f9', dark: '#2a2a2a' },
  settingText:         { light: '#64748b', dark: '#94a3b8' },

  // Buttons
  closeBtn:            { light: 'rgba(223,229,238,0.69)', dark: 'rgba(62,60,60,0.23)' },
  closeBtnHover:       { light: 'rgba(238,240,241,0.73)', dark: 'rgba(112,108,108,0.8)' },

  // Borders
  borderLight:         { light: '#e2e8f0', dark: '#2a2a2a' },
  inputBorder:         { light: '#e2e8f0', dark: '#3a3a3a' },

  // Brand variants
  darkprimary:         { light: '#0f9d9a', dark: '#0f9d9a' },
  darksecondary:       { light: '#0f9d9a', dark: '#0f9d9a' },
  darktertiary:        { light: '#6fd6c9', dark: '#6fd6c9' },

  lightprimary:        { light: '#50b3ac', dark: '#0f9d9a22' },
  lightsecondary:      { light: '#50b3ac', dark: '#0f9d9a22' },
  lighttertiary:       { light: '#50b3ac', dark: '#6fd6c922' },

  // Social
  facebook:            { light: '#4267b2', dark: '#4267b2' },
  twitter:             { light: '#1da1f2', dark: '#1da1f2' },
  linkedin:            { light: '#0e76a8', dark: '#0e76a8' },

  // Draft / inactive
  draft:               { light: '#64748b', dark: '#94a3b8' },

  // Toolbar
  toolbarBg:           { light: '#ffffff', dark: '#0f172a' },
  accent:              { light: '#0f9d9a', dark: '#0f9d9a' },
  gray100:             { light: '#f8fafc', dark: '#1e293b' },

  // Primary backgrounds
  primaryBg:           { light: '#f0fbfa', dark: '#0f9d9a22' },
  primaryHover:        { light: '#f1f9f8', dark: '#0f9d9a33' },

  // View All Button
  viewAllBg:            { light: '#f0fbfa', dark: '#183c3b' },
  viewAllHoverBg:       { light: '#f1f9f8', dark: '#20504e' },
  viewAllText:          { light: '#0f9d9a', dark: '#ffffff' },
  viewAllBorder:        { light: '#8bd1cc', dark: '#6fd6c9' },

  // Black
  black:                { light: '#000000', dark: '#000000' },
} satisfies Record<string, Record<Mode, string>>;

// BUILD COLORS
const buildColors = (mode: Mode): ThemeTypes['colors'] =>
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [key, value[mode]]),
  ) as ThemeTypes['colors'];

// THEMES
const LightTheme: ThemeTypes = {
  name: AppTheme.LIGHT,
  dark: false,
  variables: {
    'border-color': colors.borderLight.light,
    'carousel-control-size': 10,
  },
  colors: buildColors('light'),
};

const DarkTheme: ThemeTypes = {
  name: AppTheme.DARK,
  dark: true,
  variables: {
    'border-color': colors.borderLight.dark,
    'carousel-control-size': 10,
  },
  colors: buildColors('dark'),
};

export { LightTheme, DarkTheme };
