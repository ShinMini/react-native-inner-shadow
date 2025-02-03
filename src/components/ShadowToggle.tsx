import React from 'react';
import { Pressable } from 'react-native';
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { ShadowToggleProps } from '../types';
import {
  COMMON_STYLES,
  DEFAULT_REFLECTED_LIGHT_COLOR,
  DEFAULT_SHADOW_COLOR,
} from '../constants';

import { getBackgroundColor } from '../utils';

const PressButton = Animated.createAnimatedComponent(Pressable);

/**
 * ShadowToggle
 * ----------------
 * A toggle component that casts a shadow when active.
 * The shadow effect is created using the `@shopify/react-native-skia` library.
 *
 * @param initialDepth - The initial depth of the shadow
 * @param shadowSpace - The space between the shadow and the component
 * @param isActive - Whether the shadow is active
 * @param activeColor - The color of the shadow when active
 */
export const ShadowToggle = ({
  width: _width = 0,
  height: _height = 0,
  initialDepth = 3,
  shadowSpace = 6,
  shadowBlur = 10,
  shadowColor = DEFAULT_SHADOW_COLOR,
  reflectedLightColor = DEFAULT_REFLECTED_LIGHT_COLOR,
  duration = 200,
  damping = 0.8,
  isReflectedLightEnabled = true,
  isActive = false,
  activeColor,
  ...props
}: ShadowToggleProps) => {
  const [boxSize, setBoxSize] = React.useState({
    width: _width,
    height: _height,
  });

  // Determine the final background color (pulling from `props.style` or a default).
  const backgroundColor = getBackgroundColor(props);
  const boxRadius = Number(props?.style ? props.style.borderRadius : 0) || 10;

  const depth = useSharedValue(initialDepth);
  const offset = useDerivedValue(() => Math.abs(depth.value));
  const rfOffset = useDerivedValue(() =>
    interpolate(depth.value, [-initialDepth, initialDepth * damping], [-3, 3])
  );

  const _backgroundColor = useDerivedValue(() =>
    interpolateColor(
      depth.value,
      [initialDepth, -initialDepth * damping],
      [backgroundColor, activeColor || backgroundColor]
    )
  );

  const inset = useDerivedValue(() => depth.value <= 0);
  const blur = useDerivedValue(() =>
    interpolate(
      Math.abs(depth.value),
      [shadowBlur, 0],
      [0, initialDepth * damping]
    )
  );

  useAnimatedReaction(
    () => isActive,
    (next) => {
      depth.value = withTiming(next ? -initialDepth * damping : initialDepth, {
        duration,
      });
    },
    [isActive]
  );

  return (
    <PressButton
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => setBoxSize({ width, height })}
      {...props}
      style={[props.style, COMMON_STYLES.canvasWrapper]}
    >
      {boxSize.width === 0 && boxSize.height === 0 ? null : (
        <Canvas
          style={[
            props.style,
            COMMON_STYLES.canvas,
            { width: boxSize.width, height: boxSize.height },
          ]}
        >
          <RoundedRect
            x={shadowSpace}
            y={shadowSpace}
            width={boxSize.width - shadowSpace * 2}
            height={boxSize.height - shadowSpace * 2}
            r={boxRadius}
            color={_backgroundColor} // The background fill of the rect
          >
            <Shadow
              dx={offset}
              dy={offset}
              blur={blur}
              color={shadowColor}
              inner={inset}
            />

            {isReflectedLightEnabled && (
              <Shadow
                dx={rfOffset}
                dy={rfOffset}
                blur={blur}
                color={reflectedLightColor}
                inner
              />
            )}
          </RoundedRect>
        </Canvas>
      )}
      {props.children}
    </PressButton>
  );
};
