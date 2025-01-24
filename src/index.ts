import { ShadowView, LinearShadowView } from './components/ShadowView';
import { ShadowPressable } from './components/ShadowPressable';

import { getBackgroundColor, getShadowProperty } from './utils';

import {
  DEFAULT_SHADOW_OFFSET_SCALE,
  DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_REFLECTED_LIGHT_COLOR,
  DEFAULT_SHADOW_COLOR,
  DEFAULT_SHADOW_BLUR,
  DEFAULT_REFLECTED_LIGHT_BLUR,
} from './types';

export type {
  LINEAR_DIRECTION,
  InnerShadowProps,
  LinearInnerShadowProps,
} from './types';

// Export the types and constants for use in other modules.
export {
  DEFAULT_SHADOW_OFFSET_SCALE,
  DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_REFLECTED_LIGHT_COLOR,
  DEFAULT_SHADOW_COLOR,
  DEFAULT_SHADOW_BLUR,
  DEFAULT_REFLECTED_LIGHT_BLUR,
};

// Export the types and constants for use in other modules.
export { getBackgroundColor, getShadowProperty };

// Export the main components and utility functions.
export { ShadowView, LinearShadowView, ShadowPressable };
