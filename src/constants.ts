import { StyleSheet } from 'react-native';

const BACKGROUND_COLOR = '#FFFFFF' as const;

const INITIAL_DEPTH = 3 as const;
const SHADOW_SPACE = 6 as const;

const SHADOW_BLUR = 2 as const;
const REFLECTED_LIGHT_BLUR = 3 as const;

const SHADOW_COLOR = '#2F2F2FBC' as const;
const REFLECTED_LIGHT_COLOR = '#EEE9E92D' as const;

const DAMPING_DURATION = 200 as const;
const DAMPING_RATIO = 0.8 as const;

const IS_REFLECTED_LIGHT_ENABLED = true as const;

// These two scales are opposite each other to create a "reflected light" effect.
const SHADOW_OFFSET_SCALE = 2 as const;
const REFLECTED_LIGHT_OFFSET_SCALE = 2 as const;

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
  BACKGROUND_COLOR,
  INITIAL_DEPTH,
  SHADOW_SPACE,
  SHADOW_BLUR,
  REFLECTED_LIGHT_BLUR,
  SHADOW_COLOR,
  REFLECTED_LIGHT_COLOR,
  DAMPING_DURATION,
  DAMPING_RATIO,
  IS_REFLECTED_LIGHT_ENABLED,
  SHADOW_OFFSET_SCALE,
  REFLECTED_LIGHT_OFFSET_SCALE,
  COMMON_STYLES,
};
