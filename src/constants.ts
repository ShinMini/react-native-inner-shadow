import { StyleSheet } from 'react-native';

// These two scales are opposite each other to create a "reflected light" effect.
const DEFAULT_SHADOW_OFFSET_SCALE = 2 as const;
const DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE = 2 as const;

/**
 * Default values used when a particular prop isn't provided:
 *   - DEFAULT_BACKGROUND_COLOR: typical white background
 *   - DEFAULT_REFLECTED_LIGHT_COLOR: a semi-transparent white for "reflected light" effect
 *   - DEFAULT_SHADOW_COLOR: a dark, semi-transparent color for shadows
 */
const DEFAULT_BACKGROUND_COLOR = '#FFFFFF' as const;
const DEFAULT_REFLECTED_LIGHT_COLOR = '#EEE9E92D' as const;
const DEFAULT_SHADOW_COLOR = '#2F2F2FBC' as const;
// const TEST_BACKGROUND_COLOR = '#FFFEED' as const;

/**
 * Default shadow blur radius for the main shadow and reflected light.
 * These values control how soft or diffuse the shadow/highlight appears.
 * Higher values create larger, softer shadows.
 * */
const DEFAULT_SHADOW_BLUR = 3 as const;
const DEFAULT_REFLECTED_LIGHT_BLUR = 3 as const;

const COMMON_STYLES = StyleSheet.create({
  canvasWrapper: {
    backgroundColor: 'transparent',
  },
  canvas: {
    position: 'absolute',
    left: 0,

    top: 0,
    backgroundColor: 'transparent',
  },
} as const);

export {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_SHADOW_OFFSET_SCALE,
  DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE,
  DEFAULT_SHADOW_BLUR,
  DEFAULT_REFLECTED_LIGHT_BLUR,
  DEFAULT_SHADOW_COLOR,
  DEFAULT_REFLECTED_LIGHT_COLOR,
  COMMON_STYLES,
};
