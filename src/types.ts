import {AnimatedProp, Color} from '@shopify/react-native-skia';
import {ReactNode} from 'react';
import type {PressableProps, ViewStyle} from 'react-native';

/**
 * Default gap or "padding" on each side of the shadowed box.
 * This spacing ensures the shadow has enough room to be rendered
 * without getting clipped.
 */
// export const DEFAULT_SHADOW_SPACE = {dx: 6, dy: 6} as const;
const DEFAULT_SHADOW_SPACE = 6 as const;

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
// const DEFAULT_REFLECTED_LIGHT_COLOR = '#6666ff' as const;
const DEFAULT_SHADOW_COLOR = '#2F2F2FBC' as const;

/**
 * Default shadow blur radius for the main shadow and reflected light.
 * These values control how soft or diffuse the shadow/highlight appears.
 * Higher values create larger, softer shadows.
 * */
const DEFAULT_SHADOW_BLUR = 3 as const;
const DEFAULT_REFLECTED_LIGHT_BLUR = 3 as const;

/**
 * InnerShadowProps defines the basic requirements for
 * an inset-shadow component. These props control:
 *   - Basic layout (width, height, backgroundColor)
 *   - Shadow styling (color, blur, offset)
 *   - Optional reflected light styling (color, blur, offset)
 *   - PressableProps allows the shadowed element to be interactable.
 */
export type InnerShadowProps = {
  /**
   * Content that will be nested within the shadowed box.
   */
  children?: ReactNode;

  /**
   * Whether to render the shadow as inset (inside the component).
   * @Defaults to false.
   */
  inset?: boolean;

  /**
   * Primary shadow color. @Defaults to a dark gray (#2F2F2FBC).
   */
  shadowColor?: string;

  /**
   * How far the shadow is shifted horizontally (width) and vertically (height).
   * For an inset shadow, positive offsets often move the shadow "downward/rightward."
   * @default { width: 2, height: 2 }
   */
  shadowOffset?: {width: number; height: number};

  /**
   * The blur radius for the main shadow. Higher values create softer, larger shadows.
   *
   * when `inset` property is `false`(outer shadow), the shadow blur substitutes shadowOpacity (0 ~ 1)
   * @argument min: 0, max: 20
   * @Defaults 3 for a visible spread.
   */
  shadowBlur?: number;

  /**
   * Whether to enable reflected light (like a “highlight” on the opposite side of the shadow).
   * @Default to true if inset is true, but can be overridden.
   */
  isReflectedLightEnabled?: boolean;

  /**
   * Color of the reflected light highlight.
   * @Defaults to a slightly transparent white (#FFFFFF94).
   */
  reflectedLightColor?: string;

  /**
   * Offset for the reflected light highlight; typically the negative
   * of the main shadow offset to appear on the “opposite” side.
   * @default { width: -2, height: -2 }
   */
  reflectedLightOffset?: {width: number; height: number};

  /**
   * The blur radius for the reflected light highlight.
   * @argument min: 0, max: 20
   * @Default 3  for a noticeable, soft glow.
   */
  reflectedLightBlur?: number;

  /**
   * Padding around the inside of the box. This helps prevent shadows
   * from being clipped by the container’s edges.
   * @Default 6
   */
  shadowSpace?: number;

  /**
   * Explicitly setting width and height can improve performance by
   * avoiding repeated layout passes. Also helps in cases where the
   * shadow must be calculated exactly.
   */
  width?: number;
  height?: number;

  /**
   * The background color of the shadowed component.
   * @Defaults to #FFFFFF unless overridden by style or this prop.
   */
  backgroundColor?: string;

  /**
   * Standard React Native styling object. Can include borderRadius
   * for rounded corners, etc.
   */
  style?: ViewStyle;
} & PressableProps;

/**
 * LINEAR_DIRECTION defines the four basic directions for
 * linear gradients. Additional or diagonal directions can be
 * implemented if needed (e.g., 'topLeft', 'bottomRight', etc.).
 */
export type LINEAR_DIRECTION = 'top' | 'bottom' | 'left' | 'right';

/**
 * LinearInnerShadowViewProps extends InnerShadowProps
 * to incorporate linear gradient capabilities.
 *
 * @param from - The start direction of the linear gradient (e.g., 'top')
 * @param to - The end direction of the linear gradient (e.g., 'bottom')
 * @param colors - An array of colors for the gradient. Using multiple colors
 *                 creates more visually interesting transitions.
 */
export type LinearInnerShadowViewProps = {
  from?: LINEAR_DIRECTION;
  to?: LINEAR_DIRECTION;
  colors: AnimatedProp<Color[]>;
} & InnerShadowProps &
  PressableProps;

export {
  DEFAULT_SHADOW_SPACE,
  DEFAULT_SHADOW_OFFSET_SCALE,
  DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_REFLECTED_LIGHT_COLOR,
  DEFAULT_SHADOW_COLOR,
  DEFAULT_SHADOW_BLUR,
  DEFAULT_REFLECTED_LIGHT_BLUR,
};
