import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Canvas, Shadow } from '@shopify/react-native-skia';
import Animated, {
  interpolateColor,
  useAnimatedReaction,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import type { LinearShadowToggleProps, ShadowToggleProps } from '../types';
import {
  CANVAS_PADDING,
  COMMON_STYLES,
  DAMPING_DURATION,
  DAMPING_RATIO,
  INITIAL_DEPTH,
  IS_REFLECTED_LIGHT_ENABLED,
} from '../constants';

import { isLinearProps } from '../utils';
import LinearGradientFill from './ShadowLinearGradientFill';
import { useAnimatedOffset } from '../hooks/useAnimatedOffset';
import { CornerRadii } from './CornerRadii';
import { useShadowProperties } from '../hooks/useShadowProperties';

const PressButton = Animated.createAnimatedComponent(Pressable);

export const UnifiedShadowToggle = memo(function ShadowToggle({
  width: propWidth,
  height: propHeight,
  isActive = false,
  activeColor,
  duration = DAMPING_DURATION,
  damping = DAMPING_RATIO,
  isReflectedLightEnabled = IS_REFLECTED_LIGHT_ENABLED,
  style,
  children,
  onLayout: propsOnLayout,
  ...props
}: ShadowToggleProps | LinearShadowToggleProps) {
  const { flatStyle, bgColor, shadowProps, layout, canRenderCanvas, onLayout } =
    useShadowProperties({
      propWidth,
      propHeight,
      style,
      propsOnLayout,
      ...props,
    });

  const isLinear = isLinearProps(props);

  const {
    depth,
    inset,
    offset,
    reflectedLightOffset,
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

  const animatedBackgroundColor = useDerivedValue(() =>
    interpolateColor(
      depth.value,
      [INITIAL_DEPTH, -INITIAL_DEPTH * damping],
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
            backgroundColor={animatedBackgroundColor}
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
        // eslint-disable-next-line react-native/no-inline-styles
        style={[{ zIndex: 1 }, flatStyle, COMMON_STYLES.canvasWrapper]}
      >
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
