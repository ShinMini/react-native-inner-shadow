import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  DEFAULT_REFLECTED_LIGHT_COLOR,
  DEFAULT_SHADOW_COLOR,
  type ShadowPressableProps,
} from '../types';
import { useState } from 'react';
import { getBackgroundColor } from '../utils';
import { Pressable, StyleSheet } from 'react-native';

export const ShadowPressable = ({
  width: _width = 0,
  height: _height = 0,
  initialDepth = 3,
  shadowSpace = 6,
  shadowBlur = 10,
  shadowColor = DEFAULT_SHADOW_COLOR,
  reflectedLightColor = DEFAULT_REFLECTED_LIGHT_COLOR,
  duration = 200,
  dumping = 0.8,
  isReflectedLightEnabled = true,
  ...props
}: ShadowPressableProps) => {
  const [boxSize, setBoxSize] = useState({ width: _width, height: _height });

  // Determine the final background color (pulling from `props.style` or a default).
  const backgroundColor = getBackgroundColor(props);
  const boxRadius = Number(props?.style ? props.style.borderRadius : 0) || 10;

  const depth = useSharedValue(initialDepth);
  const offset = useDerivedValue(() => Math.abs(depth.value));
  const rfOffset = useDerivedValue(() =>
    interpolate(depth.value, [-initialDepth, initialDepth * dumping], [-3, 3])
  );

  const inset = useDerivedValue(() => depth.value <= 0);
  const blur = useDerivedValue(() =>
    interpolate(
      Math.abs(depth.value),
      [shadowBlur, 0],
      [0, initialDepth * dumping]
    )
  );

  const onPressIn = () => {
    depth.value = withTiming(-initialDepth * dumping, { duration });
  };
  const onPressOut = () => {
    depth.value = withTiming(initialDepth, { duration });
  };

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
      onPressIn={onPressIn}
      onPressOut={onPressOut}
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
            color={backgroundColor} // The background fill of the rect
          >
            <Shadow
              dx={offset}
              dy={offset}
              blur={blur.value}
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
  },
});
