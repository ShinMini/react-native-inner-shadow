export type {
  LINEAR_DIRECTION,
  ShadowProps,
  ShadowViewProps,
  InnerShadowProps,
  LinearInnerShadowProps,
  ShadowPressableProps,
  LinearShadowPressableProps,
  ShadowToggleProps,
  LinearShadowToggleProps,
} from './types';

export {
  getBackgroundColor,
  computeShadowProperties,
  getLinearDirection,
  isLinearProps,
} from './utils';

// hooks
export { useShadowProperties } from './hooks/useShadowProperties';
export { useAnimatedOffset } from './hooks/useAnimatedOffset';

export { ShadowView, LinearShadowView } from './components/ShadowView';
export {
  ShadowPressable,
  LinearShadowPressable,
} from './components/ShadowPressable';
export { ShadowToggle, LinearShadowToggle } from './components/ShadowToggle';
