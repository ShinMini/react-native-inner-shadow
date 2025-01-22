import { AnimatedProp, Color } from '@shopify/react-native-skia';
import { ReactNode } from 'react';
import type { PressableProps, ViewStyle } from 'react-native';

/**
 * Default gap or "padding" on each side of the shadowed box.
 * This spacing ensures the shadow has enough room to be rendered
 * without getting clipped.
 */
export const DEFAULT_SHADOW_SPACE = { dx: 6, dy: 6 } as const;

/**
 * Default values used when a particular prop isn't provided:
 *   - DEFAULT_BACKGROUND_COLOR: typical white background
 *   - DEFAULT_REFLECTED_LIGHT_COLOR: a semi-transparent white for "reflected light" effect
 *   - DEFAULT_SHADOW_COLOR: a dark, semi-transparent color for shadows
 */
const DEFAULT_BACKGROUND_COLOR = '#FFFFFF' as const;
const DEFAULT_REFLECTED_LIGHT_COLOR = '#FFFFFF94' as const;
const DEFAULT_SHADOW_COLOR = '#2F2F2FBC' as const;

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
   * Defaults to false.
   */
  inset?: boolean;

  /**
   * Primary shadow color. Defaults to a dark gray (#2F2F2FBC).
   */
  shadowColor?: string;

  /**
   * How far the shadow is shifted horizontally (width) and vertically (height).
   * For an inset shadow, positive offsets often move the shadow "downward/rightward."
   */
  shadowOffset?: { width: number; height: number };

  /**
   * The blur radius for the main shadow. Higher values create softer, larger shadows.
   * Defaults to 3 for a visible spread.
   */
  shadowBlur?: number;

  /**
   * Whether to enable reflected light (like a “highlight” on the opposite side of the shadow).
   * Defaults to true if inset is true, but can be overridden.
   */
  isReflectedLightEnabled?: boolean;

  /**
   * Color of the reflected light highlight.
   * Defaults to a slightly transparent white (#FFFFFF94).
   */
  reflectedLightColor?: string;

  /**
   * Offset for the reflected light highlight; typically the negative
   * of the main shadow offset to appear on the “opposite” side.
   */
  reflectedLightOffset?: { width: number; height: number };

  /**
   * The blur radius for the reflected light highlight.
   * Defaults to 3 for a noticeable, soft glow.
   */
  reflectedLightBlur?: number;

  /**
   * Padding around the inside of the box. This helps prevent shadows
   * from being clipped by the container’s edges.
   * Defaults to { dx: 6, dy: 6 }.
   */
  shadowSpace?: { dx: number; dy: number };

  /**
   * Explicitly setting width and height can improve performance by
   * avoiding repeated layout passes. Also helps in cases where the
   * shadow must be calculated exactly.
   */
  width?: number;
  height?: number;

  /**
   * The background color of the shadowed component.
   * Defaults to #FFFFFF unless overridden by style or this prop.
   */
  backgroundColor?: string;

  /**
   * This can store a gradient or additional styling hints.
   * Not actively used in this utility but can be utilized by
   * extended shadow components.
   */
  gradient?: number;

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
  colors: AnimatedProp<Color[], any>;
} & InnerShadowProps & PressableProps;

/**
 * getBackgroundColor retrieves the final background color
 * from either:
 *   1) props.backgroundColor
 *   2) style.backgroundColor
 *   3) DEFAULT_BACKGROUND_COLOR
 *
 * This ensures there is always a valid color for the component’s background.
 */
export function getBackgroundColor(
  props: Pick<InnerShadowProps, 'backgroundColor' | 'style' | 'children'>
) {
  const backgroundColor =
    props.backgroundColor ??
    props.style?.backgroundColor ??
    DEFAULT_BACKGROUND_COLOR;

  return backgroundColor as string;
}

/**
 * getShadowProperty determines the final configuration for both
 * the main shadow and any reflected light. It merges default values
 * with provided props to form a complete “shadow settings” object.
 *
 * - shadowOffset / reflectedLightOffset: how far the shadows/highlights
 *   are shifted in x and y.
 * - shadowColor / reflectedLightColor: colors used for each effect.
 * - shadowBlur / reflectedLightBlur: blur radius for the softness/spread
 *   of the shadow or highlight.
 */
export function getShadowProperty(props: Omit<InnerShadowProps, 'children'>) {
  const SHADOW_OFFSET_WIDTH = props.shadowOffset?.width ?? 2;
  const SHADOW_OFFSET_HEIGHT = props.shadowOffset?.height ?? 2;

  // By default, the reflected light offset is the inverse of the main shadow
  // so it appears on the opposite corner/side.
  const REFLECTED_LIGHT_OFFSET_WIDTH =
    props.reflectedLightOffset?.width ?? -SHADOW_OFFSET_WIDTH;
  const REFLECTED_LIGHT_OFFSET_HEIGHT =
    props.reflectedLightOffset?.height ?? -SHADOW_OFFSET_HEIGHT;

  // "Blur" here maps to how soft or large the shadow/highlight is.
  // The higher the number, the more diffuse the effect.
  const shadowBlur = props.shadowBlur ?? 3;
  const reflectedLightBlur = props.reflectedLightBlur ?? 3;

  // Fallback to the provided defaults if the user doesn't specify a color.
  const shadowColor = props.shadowColor ?? DEFAULT_SHADOW_COLOR;
  const reflectedLightColor =
    props.reflectedLightColor ?? DEFAULT_REFLECTED_LIGHT_COLOR;

  // Construct the final offsets as objects for clarity.
  const shadowOffset = {
    width: SHADOW_OFFSET_WIDTH,
    height: SHADOW_OFFSET_HEIGHT,
  };
  const reflectedLightOffset = {
    width: REFLECTED_LIGHT_OFFSET_WIDTH,
    height: REFLECTED_LIGHT_OFFSET_HEIGHT,
  };

  return {
    shadowOffset,
    reflectedLightOffset,
    shadowColor,
    reflectedLightColor,
    shadowBlur,
    reflectedLightBlur,
  };
}
