import type { AnimatedProp, Color } from '@shopify/react-native-skia';
import type { ReactNode } from 'react';
import type { PressableProps, ViewProps, ViewStyle } from 'react-native';

export type ShadowViewProps = InnerShadowProps | LinearInnerShadowProps;

/**
 * InnerShadowProps defines the basic requirements for
 * an inset-shadow component. These props control:
 *   - Basic layout (width, height, backgroundColor)
 *   - Shadow styling (color, blur, offset)
 *   - Optional reflected light styling (color, blur, offset)
 *   - PressableProps allows the shadowed element to be intractable.
 */
export interface InnerShadowProps extends ViewProps {
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
  shadowOffset?: { width: number; height: number };

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
  reflectedLightOffset?: { width: number; height: number };

  /**
   * The blur radius for the reflected light highlight.
   * @argument min: 0, max: 20
   * @Default 3  for a noticeable, soft glow.
   */
  reflectedLightBlur?: number;

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
}

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
export interface LinearInnerShadowProps extends InnerShadowProps {
  from?: LINEAR_DIRECTION;
  to?: LINEAR_DIRECTION;
  colors: AnimatedProp<Color[]>;
}

export type ShadowPressableProps = PressableProps &
  Omit<InnerShadowProps, 'inset'> & {
    /**
     * The space between the shadow and the box.
     * @Default 3
     *
     * If your shadow is too close to the edge of the box, it may be clipped.
     * I'd recommend a minimum of 3-5 pixels of space for most shadows.
     */
    shadowSpace?: number; // 3
    /**
     * The initial depth of the shadow effect.
     * @Default 5
     * @argument min: 0, max: 20
     */
    initialDepth?: number; // 5;
    /**
     * The duration of the shadow animation when pressed.
     * @Default 500
     */
    duration?: number; // 500;
    /**
     * The damping ratio for the shadow animation.
     * @Default 0.8
     */
    damping?: number; //0.8;
  };

export type ShadowToggleProps = ShadowPressableProps & {
  /**
   * current state of the toggle
   * @Default false
   */
  isActive?: boolean;
  /**
   * The color of the active state.
   * @Default same as backgroundColor
   */
  activeColor?: string;
};

export type GetBackgroundColorProps = Pick<
  InnerShadowProps,
  'backgroundColor' | 'style'
>;

export type GetShadowPropertyProps = Pick<
  InnerShadowProps,
  | 'inset'
  | 'shadowOffset'
  | 'shadowBlur'
  | 'shadowColor'
  | 'reflectedLightOffset'
  | 'reflectedLightBlur'
  | 'reflectedLightColor'
>;

export type SetReflectedLightDirectionAndScaleProps = {
  inset?: boolean;
  reflectedLightScale?: number;
  shadowEffectScale: number;
};

export type GetOuterShadowOffsetProps = Pick<
  InnerShadowProps,
  'inset' | 'shadowOffset' | 'shadowColor' | 'shadowBlur'
>;
