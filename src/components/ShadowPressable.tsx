import React, { memo } from 'react';
import { Pressable, type GestureResponderEvent } from 'react-native';
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import Animated, {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { ShadowPressableProps } from '../types';
import {
  COMMON_STYLES,
  DEFAULT_REFLECTED_LIGHT_COLOR,
  DEFAULT_SHADOW_COLOR,
} from '../constants';

import { getBackgroundColor } from '../utils';

const PressButton = Animated.createAnimatedComponent(Pressable);

/**
 * ShadowPressable
 * ----------------
 * A pressable component that casts a shadow when pressed.
 * The shadow effect is created using the `@shopify/react-native-skia` library.
 *
 * @param initialDepth - The initial depth of the shadow
 * @param shadowSpace - The space between the shadow and the component
 * @param duration - The duration of the shadow animation
 * @param damping - The damping factor of the shadow animation
 * @param isReflectedLightEnabled - Whether the reflected light effect is enabled
 */
export const ShadowPressable = memo(function ShadowPressable({
  width = 0,
  height = 0,
  initialDepth = 3,
  shadowSpace = 6,
  shadowBlur = 10,
  shadowColor = DEFAULT_SHADOW_COLOR,
  reflectedLightColor = DEFAULT_REFLECTED_LIGHT_COLOR,
  duration = 200,
  damping = 0.8,
  isReflectedLightEnabled = true,
  style,
  backgroundColor,
  children,
  ...props
}: ShadowPressableProps) {
  const [boxSize, setBoxSize] = React.useState({
    width,
    height,
  });

  // Determine the final background color (pulling from `props.style` or a default).
  const _backgroundColor = getBackgroundColor({
    backgroundColor,
    style,
  });
  const boxRadius = Number(style ? style.borderRadius : 0) || 10;

  const depth = useSharedValue(initialDepth);
  const offset = useDerivedValue(() => depth.value);
  const rfOffset = useDerivedValue(() =>
    interpolate(depth.value, [-initialDepth, initialDepth * damping], [-3, 3])
  );

  const inset = useDerivedValue(() => depth.value <= 0);
  const blur = useDerivedValue(() =>
    interpolate(depth.value, [shadowBlur, 0], [0, initialDepth * damping])
  );

  const onPressIn = (event: GestureResponderEvent) => {
    depth.value = withTiming(-initialDepth * damping, { duration });
    props?.onPressIn?.(event);
  };

  const onPressOut = (event: GestureResponderEvent) => {
    depth.value = withTiming(initialDepth, { duration });
    props?.onPressOut?.(event);
  };

  return (
    <PressButton
      {...props}
      onLayout={({ nativeEvent: { layout } }) =>
        setBoxSize({ width: layout.width, height: layout.height })
      }
      style={[style, COMMON_STYLES.canvasWrapper]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {boxSize.width === 0 && boxSize.height === 0 ? null : (
        <Canvas
          style={[
            style,
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
      {children}
    </PressButton>
  );
});
