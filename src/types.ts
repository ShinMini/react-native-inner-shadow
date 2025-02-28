import type { AnimatedProp, Color } from '@shopify/react-native-skia';
import type { ReactNode } from 'react';
import type { PressableProps, ViewProps, ViewStyle } from 'react-native';

export type ShadowViewProps = InnerShadowProps | LinearInnerShadowProps;

/**
 * ShadowProps defines the basic requirements for
 * a shadow component.
 */
export type ShadowProps = {
  /**
   * Whether to render the shadow as inset (inside the component).
   * @defaultValue `false`
   */
  inset?: boolean;
  /**
   * The color of the shadow.
   *
   * @remarks
   * Can use the shadowColor prop to set the color of the shadow.
   * @defaultValue `#2F2F2FBC`
   */
  shadowColor?: string;
  /**
   * The offset of the shadow.
   *
   * @remarks
   * How far the shadow is shifted horizontally (width) and vertically (height).
   * For an inset shadow, positive offsets often move the shadow "downward/rightward."
   * @defaultValue `{ width: 2, height: 2 }`
   */
  shadowOffset?: { width: number; height: number };
  /**
   * The blur radius for the main shadow. Higher values create softer, larger shadows.
   * When `inset` property is `false`(outer shadow), the shadow blur substitutes shadowOpacity (0 ~ 1)
   *
   * @defaultValue `3` - range: `[0, 20]`
   */
  shadowBlur?: number;

  /**
   * The radius of the shadow.
   *
   * @remarks
   * This property is only used when `inset` is `false`.
   * @defaultValue `3` - range: `[0, 20]`
   */
  shadowRadius?: number;

  /**
   * The opacity of the shadow for the outline shadow of the component.
   * This property is only used when `inset` is `false`.
   *
   * @defaultValue `0.3` - range: `[0, 1]`
   */
  shadowOpacity?: number;
  /**
   * The box shadow of the shadow.
   *
   * @remarks
   * This is useful when you want to customize the `inset` shadow.
   *
   * @defaultValue `undefined`
   *
   * @example
   * ```ts
   * <ShadowView style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
   *   <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
   * </ShadowView>
   * ```
   */
  boxShadow?: string;

  /**
   * Color of the reflected light highlight.
   * @defaultValue `#FFFFFF8D`
   */
  reflectedLightColor?: string;

  /**
   * Offset for the reflected light highlight; typically the negative
   * of the main shadow offset to appear on the “opposite” side.
   * @defaultValue `{ width: -2, height: -2 }`
   */
  reflectedLightOffset?: { width: number; height: number };

  /**
   * The blur radius for the reflected light highlight.
   * @defaultValue `3` - range: `[0, 20]`
   */
  reflectedLightBlur?: number;
};

/**
 * InnerShadowProps defines the basic requirements for
 * an inset-shadow component.
 *
 * These props control:
 * - Basic layout (width, height, backgroundColor)
 * - Shadow styling (color, blur, offset)
 * - Optional reflected light styling (color, blur, offset)
 * - PressableProps allows the shadowed element to be intractable.
 *
 * @remarks
 * For the optimized performance, it is recommended to set the `width`, `height` and `backgroundColor` of the shadowed component.
 *
 * See {@link ShadowProps} for more information on the shadow properties.
 *
 * @example
 * ```ts
 * <ShadowView width={100} height={100} backgroundColor="#FFFFFF" inset>
 *   <Text>Hello, world!</Text>
 * </ShadowView>
 * ```
 */
export interface InnerShadowProps extends ViewProps, ShadowProps {
  /**
   * Content that will be nested within the shadowed box.
   */
  children?: ReactNode;

  /**
   * Whether to enable reflected light (like a “highlight” on the opposite side of the shadow).
   * @defaultValue `true`
   */
  isReflectedLightEnabled?: boolean;

  width?: number;
  height?: number;
  /**
   * The background color of the shadowed component.
   * @defaultValue `#FFFFFF`
   */
  backgroundColor?: string;
  style?: ViewStyle;
}

/**
 * LINEAR_DIRECTION defines the four basic directions for
 * linear gradients. Additional or diagonal directions can be
 * implemented if needed (e.g., 'topLeft', 'bottomRight', etc.).
 */
export type LINEAR_DIRECTION = 'top' | 'bottom' | 'left' | 'right';

export type GradientLinearProps = {
  /**
   * The start direction of the linear gradient.
   * @defaultValue `top`
   */
  from?: LINEAR_DIRECTION;
  /**
   * The end direction of the linear gradient.
   * @defaultValue `bottom`
   */
  to?: LINEAR_DIRECTION;

  /**
   * The colors of the linear gradient.
   * @defaultValue `['#FFFFFF', '#2F2F2FBC']`
   */
  colors: AnimatedProp<Color[]>;
};

/**
 * LinearInnerShadowViewProps extends InnerShadowProps
 * to incorporate linear gradient capabilities.
 *
 * @param from - The start direction of the linear gradient (e.g., 'top')
 * @param to - The end direction of the linear gradient (e.g., 'bottom')
 * @param colors - An array of colors for the gradient. Using multiple colors
 *                 creates more visually interesting transitions.
 * @remarks
 * The colors prop is an array of colors for the gradient. Using multiple colors
 * creates more visually interesting transitions.
 * See {@link LinearShadowProps} and {@link ShadowProps} for more information.
 *
 * @example
 * ```ts
 * <LinearShadowView from="top" to="bottom" colors={['#FFFFFF', '#2F2F2FBC']}>
 *   <Text>Hello, world!</Text>
 * </LinearShadowView>
 * ```
 */
export interface LinearInnerShadowProps
  extends InnerShadowProps,
    GradientLinearProps {}

export type ShadowPressableProps = PressableProps &
  Omit<InnerShadowProps, 'inset'> & {
    /**
     * Deprecated. Use shadowOffset instead.
     *
     * @deprecated Use shadowOffset instead
     * @defaultValue `3` - range: `[0, 20]`
     *
     * If your shadow is too close to the edge of the box, it may be clipped.
     * I'd recommend a minimum of 3-5 pixels of space for most shadows.
     */
    shadowSpace?: number;
    /**
     * Deprecated. Use shadowOffset instead.
     *
     * @deprecated Use shadowOffset instead
     * @defaultValue `5` - range: `[0, 20]`
     */
    initialDepth?: number;
    /**
     * The duration of the shadow animation when pressed.
     * @defaultValue `150`
     */
    duration?: number;
    /**
     * The damping ratio for the shadow animation.
     * @defaultValue `0.8`
     */
    damping?: number;
  };

export type LinearShadowPressableProps = ShadowPressableProps &
  GradientLinearProps;

export type ShadowToggleProps = ShadowPressableProps & {
  /**
   * current state of the toggle
   * @defaultValue `false`
   */
  isActive?: boolean;
  /**
   * The color of the active state.
   * @defaultValue same as `backgroundColor`
   */
  activeColor?: string;
};

export type LinearShadowToggleProps = ShadowToggleProps & GradientLinearProps;

export type GetBackgroundColorProps = Pick<
  InnerShadowProps,
  'backgroundColor' | 'style'
>;

export type GetShadowPropertyProps = Omit<
  ShadowProps,
  'boxShadow' | 'shadowRadius' | 'shadowOpacity'
>;

export type SetReflectedLightDirectionAndScaleProps = {
  inset?: boolean;
  reflectedLightScale?: number;
  defaultScale: number;
};

export type GetOuterShadowOffsetProps = {
  elevation?: number;
} & Omit<
  ShadowProps,
  'reflectedLightColor' | 'reflectedLightOffset' | 'reflectedLightBlur'
>;

export type GetLinearDirectionProps = {
  width: number;
  height: number;
  from: LINEAR_DIRECTION;
  to: LINEAR_DIRECTION;
};
