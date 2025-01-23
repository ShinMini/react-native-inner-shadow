import React from 'react';
import {Canvas, RoundedRect, Shadow} from '@shopify/react-native-skia';
import {InnerShadowProps} from '../types';

/**
 * OuterShadowCanvas
 * -------------
 * Responsible for rendering the outer shadow effect
 * inside a Skia <Canvas>. This includes the main shadow layer and
 * an optional reflected light layer. Typically used in conjunction
 * with a parent container like `ShadowView`.
 */
export default function OuterShadowCanvas({
  width,
  height,
  shadowSpace,
  style,
  shadowColor,
  shadowOffset,
  shadowBlur,
  backgroundColor,
  inset,
  reflectedLightColor,
  reflectedLightOffset,
  reflectedLightBlur,
  ...props
}: InnerShadowProps) {
  const isReflectedLightEnabled =
    props.isReflectedLightEnabled !== undefined
      ? props.isReflectedLightEnabled
      : inset;

  const boxRadius = Number(style['borderRadius']) || 0;

  return (
    <Canvas
      style={[
        style,
        {
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: 'transparent',
          overflow: 'hidden',
          width,
          height,
        },
      ]}>
      <RoundedRect
        x={shadowSpace}
        y={shadowSpace}
        width={width - shadowSpace * 2}
        height={height - shadowSpace * 2}
        r={boxRadius}
        color={backgroundColor} // The background fill of the rect
      >
        <Shadow
          dx={shadowOffset.width}
          dy={shadowOffset.height}
          blur={shadowBlur}
          color={shadowColor}
          inner={inset}
        />
        {isReflectedLightEnabled && (
          <Shadow
            dx={reflectedLightOffset.width}
            dy={reflectedLightOffset.height}
            blur={reflectedLightBlur}
            color={reflectedLightColor}
            inner
          />
        )}
      </RoundedRect>
    </Canvas>
  );
}
