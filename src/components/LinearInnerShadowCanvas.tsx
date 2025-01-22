import React from 'react';
import {
  Canvas,
  LinearGradient,
  vec,
  RoundedRect,
  Shadow,
} from '@shopify/react-native-skia';
import {LinearInnerShadowViewProps} from '../types';

/**
 * LinearShadowCanvas
 * -------------------
 * A Skia-based component that renders a RoundedRect with a
 * linear gradient fill. It also applies an inner shadow
 * and (optionally) a reflected light effect.
 */
export default function LinearShadowCanvas({
  width,
  height,
  shadowSpace,
  style,
  shadowColor,
  shadowOffset,
  shadowBlur,
  inset,
  reflectedLightColor,
  reflectedLightOffset,
  reflectedLightBlur,
  from = 'top',
  to = 'bottom',
  colors = ['#FFFFFF', '#FFFFFF'],
  ...props
}: LinearInnerShadowViewProps) {
  /**
   * Determine if the reflected light (highlight) should be rendered.
   * If `isReflectedLightEnabled` is provided, that value is used;
   * otherwise, it's true when `inset` is true.
   */
  const isReflectedLightEnabled =
    props.isReflectedLightEnabled !== undefined
      ? props.isReflectedLightEnabled
      : inset;

  /**
   * Extract a uniform border radius from the style object,
   * falling back to 0 if none is defined.
   */
  const boxRadius = Number(style['borderRadius']) || 0;

  // Prepare vector coordinates for the gradient directions.
  // The 'top' and 'bottom' are centered horizontally,
  // while 'left' and 'right' are centered vertically.
  const top = vec(width / 2, 0);
  const bottom = vec(width / 2, height);

  const left = vec(shadowSpace, height / 2);
  const right = vec(width - shadowSpace * 2, height / 2);

  // A lookup object so we can easily set the gradient start/end
  // based on the 'from' and 'to' props.
  const direction = {top, bottom, left, right};

  return (
    <Canvas
      style={[
        style,
        {
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: 'transparent',
          width,
          height,
        },
      ]}>
      <RoundedRect
        // Inset the rectangle by shadowSpace.dx/dy so the shadow
        // won't be clipped at the edges.
        x={shadowSpace}
        y={shadowSpace}
        width={width - shadowSpace * 2}
        height={height - shadowSpace * 2}
        r={boxRadius}>
        {/*
          Linear Gradient Fill:
          ---------------------
          - The gradient starts from direction[from] and ends at direction[to].
          - Colors can be any array of colors, defaulting to two
            identical colors for a subtle effect.
        */}
        <LinearGradient
          start={direction[from]}
          end={direction[to]}
          colors={colors}
        />

        {/*
          Main Inner Shadow:
          ------------------
          - The Shadow component is set to "inner" if inset is true,
            resulting in an inset shadow.
          - dx/dy define the shadow offset, blur sets the softness/spread,
            and color determines the tint and opacity.
        */}
        <Shadow
          dx={shadowOffset.width}
          dy={shadowOffset.height}
          blur={shadowBlur}
          color={shadowColor}
          inner={inset}
        />

        {/*
          Reflected Light:
          ----------------
          - If isReflectedLightEnabled is true, apply an additional
            inner shadow for a highlight. Typically offset in
            the opposite direction of the main shadow.
        */}
        {isReflectedLightEnabled && (
          <Shadow
            dx={reflectedLightOffset.width}
            dy={reflectedLightOffset.height}
            blur={reflectedLightBlur}
            color={reflectedLightColor}
            inner={inset}
          />
        )}
      </RoundedRect>
    </Canvas>
  );
}
