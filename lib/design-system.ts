/**
 * NGM Conference 5.0 Design System
 *
 * This file documents the design tokens and patterns used across the project.
 * Use these constants to maintain consistency throughout the application.
 */

export const colors = {
  // Primary brand colors
  primary: {
    DEFAULT: "#0F1990",
    hover: "#0d1470",
    dark: "blue-950",
  },

  // Accent colors
  accent: {
    green: "#0DA04C",
    greenHover: "#15803d",
    greenButton: "#16a34a",
  },

  // Text colors
  text: {
    primary: "#171717",
    secondary: "#4A5565",
    muted: "#6B7280",
    light: "#9CA3AF",
  },

  // Background colors
  background: {
    white: "#FFFFFF",
    gray: "#F9FAFB",
    grayLight: "#F3F4F6",
  },

  // Border colors
  border: {
    light: "#E5E7EB",
    DEFAULT: "#D1D5DB",
  },

  // Status colors
  status: {
    error: "#DC2626",
    errorBg: "#FEF2F2",
    errorBorder: "#FECACA",
    success: "#16A34A",
    successBg: "#F0FDF4",
  },
} as const;

export const typography = {
  // Font families
  fonts: {
    epilogue: "font-epilogue",
    archivo: "font-archivo",
    sans: "font-sans",
  },

  // Heading sizes
  headings: {
    h1: "text-4xl sm:text-5xl lg:text-[56px] font-normal leading-tight tracking-tight",
    h2: "text-2xl sm:text-4xl tracking-tight font-bold",
    h3: "text-xl sm:text-2xl font-bold",
    h4: "text-lg font-semibold",
  },

  // Body text
  body: {
    large: "text-lg sm:text-xl",
    DEFAULT: "text-base",
    small: "text-sm",
    xs: "text-xs",
  },
} as const;

export const spacing = {
  // Section padding
  section: {
    y: "py-16",
    x: "px-4 sm:px-6 lg:px-8",
    full: "py-16 px-4 sm:px-6 lg:px-8",
  },

  // Container max widths
  container: {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-7xl",
  },
} as const;

export const components = {
  // Button variants
  button: {
    primary:
      "inline-flex items-center gap-2 bg-[#0F1990] hover:bg-[#0d1470] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors duration-200",
    primaryLarge:
      "inline-flex items-center gap-2 bg-[#0F1990] hover:bg-blue-950 text-white font-bold text-sm px-7 py-3 rounded-md transition-all duration-200 tracking-wide",
    secondary:
      "inline-flex items-center gap-2 border-2 border-[#0F1990] text-[#0F1990] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#0F1990] hover:text-white transition-colors duration-200",
    green:
      "inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors duration-200",
    outline:
      "inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200",
  },

  // Card styles
  card: {
    DEFAULT: "bg-white rounded-xl border border-gray-100 shadow-sm",
    elevated: "bg-white rounded-xl shadow-lg",
    interactive:
      "bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200",
  },

  // Input styles
  input: {
    DEFAULT:
      "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#0F1990] focus:border-[#0F1990]",
    error:
      "w-full px-3 py-2 border border-red-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500",
  },

  // Badge styles
  badge: {
    primary: "bg-[#0F1990] text-white text-xs font-medium px-2.5 py-1 rounded-full",
    secondary: "bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full",
    success: "bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full",
  },
} as const;

export const effects = {
  // Transitions
  transition: {
    fast: "transition-all duration-150",
    DEFAULT: "transition-all duration-200",
    slow: "transition-all duration-300",
  },

  // Shadows
  shadow: {
    sm: "shadow-sm",
    DEFAULT: "shadow-md",
    lg: "shadow-lg",
  },

  // Hover effects
  hover: {
    scale: "hover:scale-105",
    lift: "hover:-translate-y-1",
    glow: "hover:shadow-lg",
  },
} as const;

export const layout = {
  // Page wrapper
  page: "flex flex-col min-h-screen",

  // Section wrapper
  section: "w-full py-16 px-4 sm:px-6 lg:px-12 font-epilogue",

  // Centered content
  centered: "flex items-center justify-center",

  // Max width container
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
} as const;
