import React, { memo } from 'react';
import { Pressable, View, type LayoutChangeEvent } from 'react-native';
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
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

const PressButton = Animated.createAnimatedComponent(Pressable);

export const UnifiedShadowPressable = memo(function ShadowPressable({
  width,
  height,
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
  ...props
}: ShadowPressableProps | LinearShadowPressableProps) {
  // Determine the final background color (pulling from `props.style` or a default).
  const _backgroundColor = getBackgroundColor({
    backgroundColor,
    style,
  });

  const shadowProps = getShadowProperty({
    shadowOffset,
    shadowColor,
    shadowBlur,
    reflectedLightOffset: rfOffset,
    reflectedLightColor,
    reflectedLightBlur,
  });

  const boxRadius = numerify(style?.borderRadius, 12);
  const isLinear = isLinearProps(props);

  const styleWidth = width ?? numerify(style?.width, 0);
  const styleHeight = height ?? numerify(style?.height, 0);

  const [layoutSize, setLayoutSize] = React.useState({
    width: styleWidth,
    height: styleHeight,
  });
  // Decide if we even need to attach onLayout; turns on when width or height is: undefined, NaN, or 0
  const needMeasure = !styleWidth || !styleHeight;

  // onLayout only does something if we truly need measure
  const onLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      if (!needMeasure) return;

      const { width: w, height: h } = e.nativeEvent.layout;
      setLayoutSize({ width: w, height: h });
    },
    [needMeasure]
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

  // Only show the canvas if we have a valid size
  const canRenderCanvas = layoutSize.width > 0 && layoutSize.height > 0;

  return (
    <View onLayout={onLayout} style={[COMMON_STYLES.canvasWrapper]}>
      {canRenderCanvas && (
        <Canvas
          style={[
            COMMON_STYLES.canvas,
            { width: layoutSize.width * 1.4, height: layoutSize.height * 1.4 },
          ]}
        >
          <RoundedRect
            x={0}
            y={0}
            width={layoutSize.width}
            height={layoutSize.height}
            r={boxRadius}
            color={_backgroundColor} // The background fill of the rect
          >
            {isLinear && (
              <LinearGradientFill
                {...props} // from, to, colors, etc.
                width={layoutSize.width}
                height={layoutSize.height}
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
          </RoundedRect>
        </Canvas>
      )}
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
 * @param initialDepth - deprecated: set shadow depth using `shadowOffset` instead
 * @param shadowSpace - The space between the shadow and the component
 * @param duration - The duration of the shadow animation
 * @param damping - The damping factor of the shadow animation
 * @param isReflectedLightEnabled - Whether the reflected light effect is enabled
 */
export const ShadowPressable = memo(function ShadowPressable({
  ...props
}: ShadowPressableProps) {
  return <UnifiedShadowPressable {...props} />;
});

/**
 * LinearShadowPressable
 * ----------------
 * A pressable component that casts a linear gradient shadow when pressed.
 * The shadow effect is created using the `@shopify/react-native-skia` library.
 *
 * @param initialDepth - deprecated: set shadow depth using `shadowOffset` instead
 * @param shadowSpace - The space between the shadow and the component
 * @param duration - The duration of the shadow animation
 * @param damping - The damping factor of the shadow animation
 * @param isReflectedLightEnabled - Whether the reflected light effect is enabled
 * @param colors - The colors of the linear gradient
 * @param from - The direction of the linear gradient
 * @param to - The direction of the linear gradient
 */
export const LinearShadowPressable = memo(function LinearShadowPressable({
  ...props
}: LinearShadowPressableProps) {
  return <UnifiedShadowPressable {...props} />;
});
