import React, { memo } from 'react';
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
  DAMPING_DURATION,
  DAMPING_RATIO,
  INITIAL_DEPTH,
  REFLECTED_LIGHT_COLOR,
  SHADOW_BLUR,
  SHADOW_COLOR,
  SHADOW_SPACE,
} from '../constants';

import { getBackgroundColor, getShadowProperty, numerify } from '../utils';

const PressButton = Animated.createAnimatedComponent(Pressable);

/**
 * ShadowToggle
 * ----------------
 * A toggle component that casts a shadow when active.
 * The shadow effect is created using the `@shopify/react-native-skia` library.
 *
 * @param initialDepth - deprecated: set shadow depth using `shadowOffset` instead
 * @param shadowSpace - The space between the shadow and the component
 * @param isActive - Whether the shadow is active
 * @param activeColor - The color of the shadow when active
 */
export const ShadowToggle = memo(function ShadowToggle({
  width = 0,
  height = 0,
  isActive = false,
  activeColor,
  shadowSpace = SHADOW_SPACE,
  shadowBlur = SHADOW_BLUR,
  shadowColor = SHADOW_COLOR,
  reflectedLightColor = REFLECTED_LIGHT_COLOR,
  duration = DAMPING_DURATION,
  damping = DAMPING_RATIO,
  isReflectedLightEnabled = true,
  shadowOffset,
  reflectedLightOffset,
  reflectedLightBlur,
  style,
  backgroundColor,
  children,
  ...props
}: ShadowToggleProps) {
  const [boxSize, setBoxSize] = React.useState({
    width,
    height,
  });

  // Determine the final background color (pulling from `props.style` or a default).
  const _backgroundColor = getBackgroundColor({
    style,
    backgroundColor,
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

  const animatedBackgroundColor = useDerivedValue(() =>
    interpolateColor(
      depth.value,
      [INITIAL_DEPTH, -INITIAL_DEPTH],
      [_backgroundColor, activeColor || _backgroundColor]
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
    <PressButton
      {...props}
      onLayout={({ nativeEvent: { layout } }) =>
        setBoxSize({ width: layout.width, height: layout.height })
      }
      style={[style, COMMON_STYLES.canvasWrapper]}
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
            color={animatedBackgroundColor} // The background fill of the rect
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
