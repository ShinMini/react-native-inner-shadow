import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  DEFAULT_REFLECTED_LIGHT_COLOR,
  DEFAULT_SHADOW_COLOR,
  type ShadowToggleProps,
} from '../types';

import { getBackgroundColor } from '../utils';

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
  const [boxSize, setBoxSize] = useState({ width: _width, height: _height });

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
    <Pressable
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => setBoxSize({ width, height })}
      {...props}
      style={[
        props.style,
        {
          backgroundColor: 'transparent',
        },
      ]}
    >
      {boxSize.width === 0 && boxSize.height === 0 ? null : (
        <Canvas
          style={[
            props.style,
            styles.canvas,
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
  } as const,
});
