import React, { memo, useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { Canvas, Shadow } from '@shopify/react-native-skia';
import Animated from 'react-native-reanimated';

import type {
  LinearShadowPressableProps,
  ShadowPressableProps,
} from '../types';
import {
  COMMON_STYLES,
  DAMPING_DURATION,
  DAMPING_RATIO,
  IS_REFLECTED_LIGHT_ENABLED,
  REFLECTED_LIGHT_COLOR,
  SHADOW_BLUR,
  SHADOW_COLOR,
} from '../constants';

import {
  getBackgroundColor,
  getShadowProperty,
  isLinearProps,
  numerify,
} from '../utils';
import LinearGradientFill from './ShadowLinearGradientFill';
import { useAnimatedOffset } from '../hooks/useAnimatedOffset';
import { CornerRadii } from './CornerRadii';

const PressButton = Animated.createAnimatedComponent(Pressable);

export const UnifiedShadowPressable = memo(function ShadowPressable({
  width: propWidth,
  height: propHeight,
  shadowBlur = SHADOW_BLUR,
  shadowColor = SHADOW_COLOR,
  reflectedLightColor = REFLECTED_LIGHT_COLOR,
  duration = DAMPING_DURATION,
  damping = DAMPING_RATIO,
  isReflectedLightEnabled = IS_REFLECTED_LIGHT_ENABLED,
  shadowOffset,
  reflectedLightOffset: rfOffset,
  reflectedLightBlur,
  style,
  backgroundColor,
  children,
  onLayout: propsOnLayout,
  ...props
}: ShadowPressableProps | LinearShadowPressableProps) {
  const flatStyle = useMemo(() => StyleSheet.flatten(style) || {}, [style]);
  const bgColor = getBackgroundColor({
    backgroundColor,
    styleBackground: flatStyle.backgroundColor,
  });

  const shadowProps = getShadowProperty({
    shadowOffset,
    shadowColor,
    shadowBlur,
    reflectedLightOffset: rfOffset,
    reflectedLightColor,
    reflectedLightBlur,
  });

  const isLinear = isLinearProps(props);

  const initialW = propWidth ?? numerify(flatStyle.width, 0);
  const initialH = propHeight ?? numerify(flatStyle.height, 0);
  const [layout, setLayout] = useState({ width: initialW, height: initialH });

  const onLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      propsOnLayout?.(e);

      if (initialW && initialH) return;
      const { width, height } = e.nativeEvent.layout;
      setLayout((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height }
      );
    },
    [initialW, initialH, propsOnLayout]
  );

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

  const finalWidth = layout.width;
  const finalHeight = layout.height;

  const canRenderCanvas = finalWidth && finalHeight;

  return (
    <View onLayout={onLayout} style={[COMMON_STYLES.canvasWrapper]}>
      {canRenderCanvas ? (
        <Canvas
          style={[
            COMMON_STYLES.canvas,
            { width: finalWidth * 1.4, height: finalHeight * 1.4 },
          ]}
        >
          <CornerRadii
            width={finalWidth}
            height={finalHeight}
            style={style}
            backgroundColor={bgColor}
          >
            {isLinear && (
              <LinearGradientFill
                {...props} // from, to, colors, etc.
                width={finalWidth}
                height={finalHeight}
              />
            )}

            <Shadow
              dx={offset.dx}
              dy={offset.dy}
              blur={blurRadius}
              color={shadowColor}
              inner={inset}
            />

            {isReflectedLightEnabled && (
              <Shadow
                dx={reflectedLightOffset.dx}
                dy={reflectedLightOffset.dy}
                blur={blurRadius}
                color={reflectedLightColor}
                inner
              />
            )}
          </CornerRadii>
        </Canvas>
      ) : null}
      <PressButton
        {...props}
        style={[style, COMMON_STYLES.canvasWrapper]}
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
