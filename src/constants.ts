import { StyleSheet } from 'react-native';

const CANVAS_PADDING = 50 as const;

const BACKGROUND_COLOR = '#FFFFFF' as const;

// These two scales are opposite each other to create a "reflected light" effect.
const SHADOW_OFFSET_SCALE = 2.5 as const;
const REFLECTED_LIGHT_OFFSET_SCALE = 2 as const;

const INITIAL_DEPTH = 2 as const;

const SHADOW_OPACITY = 0.3 as const;
const SHADOW_RADIUS = 3 as const;
const SHADOW_BLUR = 2 as const;
const SHADOW_ELEVATION = 3 as const;

const REFLECTED_LIGHT_BLUR = 3 as const;

const SHADOW_COLOR = '#2F2F2FBC' as const;
const REFLECTED_LIGHT_COLOR = '#FFFFFF4D' as const;

const DAMPING_DURATION = 150 as const;
const DAMPING_RATIO = 0.8 as const;

const IS_REFLECTED_LIGHT_ENABLED = true as const;

const COMMON_STYLES = StyleSheet.create({
  canvasContainer: {
    backgroundColor: 'transparent',
  },
  canvasWrapper: {
    backgroundColor: 'transparent',
  },
  canvas: {
    position: 'absolute',
    left: -CANVAS_PADDING,
    top: -CANVAS_PADDING,
    backgroundColor: 'transparent',
  },
} as const);

export {
  CANVAS_PADDING,
  BACKGROUND_COLOR,
  INITIAL_DEPTH,
  SHADOW_OPACITY,
  SHADOW_RADIUS,
  SHADOW_BLUR,
  REFLECTED_LIGHT_BLUR,
  SHADOW_COLOR,
  REFLECTED_LIGHT_COLOR,
  DAMPING_DURATION,
  DAMPING_RATIO,
  IS_REFLECTED_LIGHT_ENABLED,
  SHADOW_OFFSET_SCALE,
  REFLECTED_LIGHT_OFFSET_SCALE,
  SHADOW_ELEVATION,
  COMMON_STYLES,
};
