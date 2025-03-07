import React, { memo } from 'react';
import { Pressable, View, type LayoutChangeEvent } from 'react-native';
import { Canvas, Shadow } from '@shopify/react-native-skia';
import Animated, {
  interpolateColor,
  useAnimatedReaction,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import type { LinearShadowToggleProps, ShadowToggleProps } from '../types';
import {
  COMMON_STYLES,
  DAMPING_DURATION,
  DAMPING_RATIO,
  INITIAL_DEPTH,
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

export const UnifiedShadowToggle = memo(function ShadowToggle({
  width,
  height,
  isActive = false,
  activeColor,
  shadowBlur = SHADOW_BLUR,
  shadowColor = SHADOW_COLOR,
  reflectedLightColor = REFLECTED_LIGHT_COLOR,
  duration = DAMPING_DURATION,
  damping = DAMPING_RATIO,
  isReflectedLightEnabled = true,
  shadowOffset,
  reflectedLightOffset: rfOffset,
  reflectedLightBlur,
  style,
  backgroundColor,
  children,
  ...props
}: ShadowToggleProps | LinearShadowToggleProps) {
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
      setLayoutSize((prev) => {
        if (prev.width === w && prev.height === h) return prev;
        return { width: w, height: h };
      });
    },
    [needMeasure]
  );

  const {
    depth,
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

  const animatedBackgroundColor = useDerivedValue(() =>
    interpolateColor(
      depth.value,
      [INITIAL_DEPTH, -INITIAL_DEPTH],
      [_backgroundColor, activeColor || _backgroundColor]
    )
  );

  useAnimatedReaction(
    () => isActive,
    (next) => {
      depth.value = withTiming(
        next ? -INITIAL_DEPTH * damping : INITIAL_DEPTH,
        {
          duration,
        }
      );
    },
    [isActive]
  );

  return (
    <View onLayout={onLayout} style={[COMMON_STYLES.canvasWrapper]}>
      {canRenderCanvas && (
        <Canvas
          style={[
            COMMON_STYLES.canvas,
            { width: layoutSize.width * 1.4, height: layoutSize.height * 1.4 },
          ]}
        >
          <CornerRadii
            width={layoutSize.width}
            height={layoutSize.height}
            style={style}
            backgroundColor={animatedBackgroundColor}
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
          </CornerRadii>
        </Canvas>
      )}
      <PressButton {...props} style={[style, COMMON_STYLES.canvasWrapper]}>
        <Animated.View style={PressedAnimatedStyle}>{children}</Animated.View>
      </PressButton>
    </View>
  );
});

/**
 * ShadowToggle
 * ----------------
 * A toggle component that casts a shadow when active.
 * The shadow effect is created using the `@shopify/react-native-skia` library.
 *
 * @param isActive - Whether the shadow is active
 * @param activeColor - The color of the shadow when active
 */
export const ShadowToggle = memo(function ShadowToggle({
  ...props
}: ShadowToggleProps) {
  return <UnifiedShadowToggle {...props} />;
});

/**
 * LinearShadowToggle
 * ----------------
 * A toggle component that casts a linear gradient shadow when active.
 * The shadow effect is created using the `@shopify/react-native-skia` library.
 *
 * @param isActive - Whether the shadow is active
 * @param activeColor - The color of the shadow when active
 * @param colors - The colors of the linear gradient
 * @param from - The direction of the linear gradient
 * @param to - The direction of the linear gradient
 */
export const LinearShadowToggle = memo(function LinearShadowToggle({
  ...props
}: LinearShadowToggleProps) {
  return <UnifiedShadowToggle {...props} />;
});
