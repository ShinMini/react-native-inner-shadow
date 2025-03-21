import React, { memo, useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
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
  width: propWidth,
  height: propHeight,
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
  onLayout: propsOnLayout,
  ...props
}: ShadowToggleProps | LinearShadowToggleProps) {
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

  const finalWidth = layout.width;
  const finalHeight = layout.height;
  const canRenderCanvas = finalWidth && finalHeight;

  const animatedBackgroundColor = useDerivedValue(() =>
    interpolateColor(
      depth.value,
      [INITIAL_DEPTH, -INITIAL_DEPTH],
      [bgColor, activeColor || bgColor]
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
            backgroundColor={animatedBackgroundColor}
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
export const ShadowToggle: React.FC<ShadowToggleProps> = UnifiedShadowToggle;

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
export const LinearShadowToggle: React.FC<LinearShadowToggleProps> =
  UnifiedShadowToggle;
