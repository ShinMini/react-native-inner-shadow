import type { AnimatedProp, Color } from '@shopify/react-native-skia';
import type { ReactNode } from 'react';
import type { PressableProps, ViewProps, ViewStyle } from 'react-native';

/**
 * ShadowViewProps represents the props accepted by shadow view components.
 * It can be either an InnerShadowProps or a LinearInnerShadowProps.
 *
 * @remarks
 * Use this type to ensure that your shadow view components receive all required
 * properties for rendering either an inset shadow or a linear gradient inner shadow.
 */
export type ShadowViewProps = InnerShadowProps | LinearInnerShadowProps;

/**
 * ShadowProps defines the basic requirements for a shadow component.
 *
 * @remarks
 * These properties determine the appearance of the shadow, including its color,
 * offset, blur, and opacity. They also provide support for reflected light effects.
 *
 * @defaultValue
 * - inset: `false`
 * - shadowColor: `#2F2F2FBC`
 * - shadowOffset: `{ width: 2, height: 2 }`
 * - shadowBlur: `3` (range: `[0, 20]`)
 * - shadowRadius: `3` (range: `[0, 20]`)
 * - shadowOpacity: `0.3` (range: `[0, 1]`)
 * - reflectedLightColor: `#FFFFFF8D`
 * - reflectedLightOffset: `{ width: -2, height: -2 }`
 * - reflectedLightBlur: `3` (range: `[0, 20]`)
 *
 * @example
 * ```ts
 * const shadowProps: ShadowProps = {
 *   inset: true,
 *   shadowColor: '#000000',
 *   shadowOffset: { width: 4, height: 4 },
 *   shadowBlur: 5,
 *   shadowOpacity: 0.5,
 * };
 * ```
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
   *  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
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
 * InnerShadowProps defines the basic requirements for an inset-shadow component.
 *
 * For the **optimized performance**, it is **recommended** to set the `width`, `height` and `backgroundColor` of the shadowed component.
 *
 * @remarks
 * This interface extends React Native's ViewProps along with ShadowProps, and adds
 * properties specific to rendering an inner shadow. It is intended for components that
 * wish to render their children with an inset shadow effect.
 *
 * See {@link ShadowProps} for more information on the shadow properties.
 *
 * @example
 * ```tsx
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

/**
 * GradientLinearProps define the properties for configuring a linear gradient.
 *
 * @remarks
 * These properties are used by linear inner shadow components to define gradient transitions.
 *
 * @example
 * ```tsx
 * const gradientProps: GradientLinearProps = {
 *   from: 'top',
 *   to: 'bottom',
 *   colors: ['#FFFFFF', '#2F2F2FBC'],
 * };
 * ```
 */
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
 * The colors prop is an array of colors for the gradient. Using multiple colors
 * creates more visually interesting transitions.
 *
 * @remarks
 * In addition to all inner shadow properties, this type requires gradient properties
 * such as `from`, `to`, and `colors`, enabling developers to create complex gradient shadows.
 *
 * See {@link LinearShadowProps} and {@link ShadowProps} for more information.
 *
 * @example
 * ```tsx
 * <LinearShadowView from="top" to="bottom" colors={['#FFFFFF', '#2F2F2FBC']}>
 *   <Text>Hello, world!</Text>
 * </LinearShadowView>
 * ```
 */
export interface LinearInnerShadowProps
  extends InnerShadowProps,
    GradientLinearProps {}

/**
 * ShadowPressableProps are used for pressable shadow components.
 *
 * @remarks
 * Extends React Native’s PressableProps to allow interactive shadow components.
 * Deprecated properties such as `shadowSpace` and `initialDepth` are provided for legacy support. (below v1.3.1)
 */
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

/**
 * `ShadowToggleProps` provide properties for interactive toggleable shadow components.
 *
 * @remarks
 * Use this type when you need to indicate an active state for a shadow component.
 *
 * @Params -`isActive`, `activeColor`.
 *
 * See {@link ShadowPressableProps} for more information.
 *
 * @example
 * ```tsx
 *    <ShadowToggle isActive={isActive} activeColor="#E9C46A" onPress={onPressToggle}>
 *      <Text>Hello, world!</Text>
 *    </ShadowToggle>
 * ```
 */
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

/**
 * `GetBackgroundColorProps` defines properties for getting background color.
 */
export type GetBackgroundColorProps = {
  backgroundColor?: string;
  styleBackground?: ViewStyle['backgroundColor'];
};

export type GetBorderRadiusProps = {
  borderRadius?: ViewStyle['borderRadius'];
  borderTopStartRadius?: ViewStyle['borderTopStartRadius'];
  borderTopLeftRadius?: ViewStyle['borderTopLeftRadius'];
  borderTopEndRadius?: ViewStyle['borderTopEndRadius'];
  borderTopRightRadius?: ViewStyle['borderTopRightRadius'];
  borderBottomStartRadius?: ViewStyle['borderBottomStartRadius'];
  borderBottomLeftRadius?: ViewStyle['borderBottomLeftRadius'];
  borderBottomEndRadius?: ViewStyle['borderBottomEndRadius'];
  borderBottomRightRadius?: ViewStyle['borderBottomRightRadius'];
};

/**
 * `ShadowPropertyConfig` defines properties for getting shadow property.
 */
export type ShadowPropertyConfig = Omit<
  ShadowProps,
  'boxShadow' | 'shadowRadius' | 'shadowOpacity'
>;

/**
 * `ReflectedLightPositionConfig` defines properties for setting reflected light direction and scale.
 */
export type ReflectedLightPositionConfig = {
  inset?: boolean;
  reflectedLightScale?: number;
  baseShadowOffset: number;
};

/**
 * `GetOuterShadowOffsetProps` defines properties for calculating outer shadow offset.
 */
export type GetOuterShadowOffsetProps = {
  elevation?: number;
} & Omit<
  ShadowProps,
  'reflectedLightColor' | 'reflectedLightOffset' | 'reflectedLightBlur'
>;
/**
 * `GetLinearDirectionProps` defines the required properties for computing a linear gradient.
 */
export type GetLinearDirectionProps = {
  width: number;
  height: number;
  from: LINEAR_DIRECTION;
  to: LINEAR_DIRECTION;
};
