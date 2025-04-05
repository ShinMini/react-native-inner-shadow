import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Canvas, Shadow } from '@shopify/react-native-skia';
import Animated from 'react-native-reanimated';

import type {
  LinearShadowPressableProps,
  ShadowPressableProps,
} from '../types';
import {
  CANVAS_PADDING,
  COMMON_STYLES,
  DAMPING_DURATION,
  DAMPING_RATIO,
  IS_REFLECTED_LIGHT_ENABLED,
} from '../constants';

import { isLinearProps } from '../utils';

import LinearGradientFill from './ShadowLinearGradientFill';
import { CornerRadii } from './CornerRadii';

import { useAnimatedOffset } from '../hooks/useAnimatedOffset';
import { useShadowProperties } from '../hooks/useShadowProperties';

const PressButton = Animated.createAnimatedComponent(Pressable);

export const UnifiedShadowPressable = memo(function ShadowPressable({
  width: propWidth,
  height: propHeight,
  duration = DAMPING_DURATION,
  damping = DAMPING_RATIO,
  isReflectedLightEnabled = IS_REFLECTED_LIGHT_ENABLED,
  style,
  children,
  onLayout: propsOnLayout,
  ...props
}: ShadowPressableProps | LinearShadowPressableProps) {
  const { flatStyle, bgColor, shadowProps, layout, canRenderCanvas, onLayout } =
    useShadowProperties({
      propWidth,
      propHeight,
      style,
      propsOnLayout,
      ...props,
    });

  const {
    onPressIn,
    onPressOut,
    offset,
    reflectedLightOffset,
    inset,
    blurRadius,
    PressedAnimatedStyle,
  } = useAnimatedOffset({
    offset: shadowProps.shadowOffset,
    reflectedLightOffset: shadowProps.reflectedLightOffset,
    blurRadius: shadowProps.shadowBlur,
    damping,
    duration,
    onPressIn: props.onPressIn,
    onPressOut: props.onPressOut,
  });

  const isLinear = isLinearProps(props);

  return (
    <View onLayout={onLayout} style={COMMON_STYLES.canvasContainer}>
      {canRenderCanvas ? (
        <Canvas
          style={[
            COMMON_STYLES.canvas,
            {
              width: layout.width + CANVAS_PADDING * 2,
              height: layout.height + CANVAS_PADDING * 2,
            },
          ]}
        >
          <CornerRadii
            width={layout.width}
            height={layout.height}
            style={flatStyle}
            backgroundColor={bgColor}
          >
            {isLinear ? (
              <LinearGradientFill
                {...props} // from, to, colors, etc.
                width={layout.width}
                height={layout.height}
              />
            ) : null}

            <Shadow
              dx={offset.dx}
              dy={offset.dy}
              blur={blurRadius}
              color={shadowProps.shadowColor}
              inner={inset}
            />

            {isReflectedLightEnabled ? (
              <Shadow
                dx={reflectedLightOffset.dx}
                dy={reflectedLightOffset.dy}
                blur={blurRadius}
                color={shadowProps.reflectedLightColor}
                inner
              />
            ) : null}
          </CornerRadii>
        </Canvas>
      ) : null}
      <PressButton
        {...props}
        style={[{ zIndex: 1 }, flatStyle, COMMON_STYLES.canvasWrapper]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View style={PressedAnimatedStyle}>{children}</Animated.View>
      </PressButton>
    </View>
  );
});

/**
 * ShadowPressable
 * ----------------
 * A pressable component that casts a shadow when pressed.
 * The shadow effect is created using the `@shopify/react-native-skia` library.
 *
 * @remarks
 * See {@link ShadowPressableProps} for a linear gradient shadow.
 *
 * @example
 * ```ts
 * <ShadowPressable style={styles.shadowView} reflectedLightColor="#ffffff8d">
 *   <Text style={[styles.context]}>Press Me!</Text>
 * </ShadowPressable>
 * ```
 *
 * @param duration - The duration of the shadow animation
 * @param damping - The damping factor of the shadow animation
 * @param isReflectedLightEnabled - Whether the reflected light effect is enabled
 * @param initialDepth - deprecated: set shadow depth using `shadowOffset` instead
 * @param shadowSpace - deprecated: set shadow depth using `shadowOffset` instead
 */
export const ShadowPressable: React.FC<ShadowPressableProps> =
  UnifiedShadowPressable;

/**
 * LinearShadowPressable
 * ----------------
 * A pressable component that casts a linear gradient shadow when pressed.
 * The shadow effect is created using the `@shopify/react-native-skia` library.
 *
 * @remarks
 * See {@link LinearShadowPressableProps} for a linear gradient shadow.
 *
 * @example
 * ```ts
 * <LinearShadowPressable style={styles.shadowView} colors={['#f1c40f', '#e74c3c']} from="top" to="bottom">
 *   <Text style={[styles.context]}>Press Me!</Text>
 * </LinearShadowPressable>
 * ```
 *
 * @param duration - The duration of the shadow animation
 * @param damping - The damping factor of the shadow animation
 * @param isReflectedLightEnabled - Whether the reflected light effect is enabled
 * @param from - The direction of the linear gradient
 * @param to - The direction of the linear gradient
 */
export const LinearShadowPressable: React.FC<LinearShadowPressableProps> =
  UnifiedShadowPressable;
