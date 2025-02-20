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
  DAMPING_DURATION,
  DAMPING_RATIO,
  INITIAL_DEPTH,
  IS_REFLECTED_LIGHT_ENABLED,
  REFLECTED_LIGHT_COLOR,
  SHADOW_BLUR,
  SHADOW_COLOR,
  SHADOW_SPACE,
} from '../constants';

import { getBackgroundColor, getShadowProperty, numerify } from '../utils';

const PressButton = Animated.createAnimatedComponent(Pressable);

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
  width = 0,
  height = 0,
  shadowSpace = SHADOW_SPACE,
  shadowBlur = SHADOW_BLUR,
  shadowColor = SHADOW_COLOR,
  reflectedLightColor = REFLECTED_LIGHT_COLOR,
  duration = DAMPING_DURATION,
  damping = DAMPING_RATIO,
  isReflectedLightEnabled = IS_REFLECTED_LIGHT_ENABLED,
  shadowOffset,
  reflectedLightOffset,
  reflectedLightBlur,
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

  const shadowProps = getShadowProperty({
    shadowOffset,
    shadowColor,
    shadowBlur,
    reflectedLightOffset,
    reflectedLightColor,
    reflectedLightBlur,
  });

  const boxRadius = numerify(style?.borderRadius, 12);

  const depth = useSharedValue<number>(INITIAL_DEPTH);

  const offsetWidth = useDerivedValue(() =>
    interpolate(
      depth.value,
      [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
      [
        shadowProps.shadowOffset.width,
        0,
        shadowProps.shadowOffset.width * damping,
      ]
    )
  );
  const offsetHeight = useDerivedValue(() =>
    interpolate(
      depth.value,
      [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
      [
        shadowProps.shadowOffset.height,
        0,
        shadowProps.shadowOffset.height * damping,
      ]
    )
  );
  const rfOffsetWidth = useDerivedValue(() =>
    interpolate(
      depth.value,
      [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
      [
        shadowProps.reflectedLightOffset.width,
        0,
        shadowProps.reflectedLightOffset.width * damping,
      ]
    )
  );
  const rfOffsetHeight = useDerivedValue(() =>
    interpolate(
      depth.value,
      [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
      [
        shadowProps.reflectedLightOffset.height,
        0,
        shadowProps.reflectedLightOffset.height * damping,
      ]
    )
  );

  const inset = useDerivedValue(() => depth.value <= 0);
  const blur = useDerivedValue(() =>
    interpolate(
      depth.value,
      [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
      [shadowProps.shadowBlur * 1.5, 0, shadowProps.shadowBlur]
    )
  );

  const onPressIn = (event: GestureResponderEvent) => {
    depth.value = withTiming(-INITIAL_DEPTH, { duration });
    props?.onPressIn?.(event);
  };

  const onPressOut = (event: GestureResponderEvent) => {
    depth.value = withTiming(INITIAL_DEPTH, { duration });
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
              dx={offsetWidth}
              dy={offsetHeight}
              blur={blur}
              color={shadowColor}
              inner={inset}
            />

            {isReflectedLightEnabled && (
              <Shadow
                dx={rfOffsetWidth}
                dy={rfOffsetHeight}
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
