export {
  DEFAULT_SHADOW_OFFSET_SCALE,
  DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_REFLECTED_LIGHT_COLOR,
  DEFAULT_SHADOW_COLOR,
  DEFAULT_SHADOW_BLUR,
  DEFAULT_REFLECTED_LIGHT_BLUR,
} from './constants';

export type {
  LINEAR_DIRECTION,
  ShadowViewProps,
  InnerShadowProps,
  LinearInnerShadowProps,
  ShadowPressableProps,
  ShadowToggleProps,
} from './types';

export {
  getBackgroundColor,
  getShadowProperty,
  getLinearDirection,
  isLinearProps,
} from './utils';

export { ShadowView, LinearShadowView } from './components/ShadowView';
export { ShadowPressable } from './components/ShadowPressable';
export { ShadowToggle } from './components/ShadowToggle';
