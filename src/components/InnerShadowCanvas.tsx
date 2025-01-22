import React from 'react';
import {Canvas, RoundedRect, Shadow} from '@shopify/react-native-skia';
import {InnerShadowProps} from '../types';

/**
 * ShadowCanvas
 * -------------
 * Responsible for rendering the inset (or regular) shadow effect
 * inside a Skia <Canvas>. This includes the main shadow layer and
 * an optional reflected light layer. Typically used in conjunction
 * with a parent container like `ShadowView`.
 */
export default function ShadowCanvas({
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
  /**
   * Determine if the reflected light layer should be rendered.
   * If `isReflectedLightEnabled` is explicitly set, use that.
   * Otherwise, default to rendering reflected light if `inset` is true.
   */
  const isReflectedLightEnabled =
    props.isReflectedLightEnabled !== undefined
      ? props.isReflectedLightEnabled
      : inset;

  /**
   * Extract a uniform corner radius from `style.borderRadius`.
   * If no radius is provided, default to 0 for sharp corners.
   * Note: more advanced logic may be needed to handle differing
   * corner radii on each corner.
   */
  const boxRadius = Number(style['borderRadius']) || 0;

  return (
    <Canvas
      style={[
        style,
        {
          // Positioning the Canvas absolutely over its parent container
          // ensures we can draw shadows and backgrounds without affecting
          // the parent’s layout or size.
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: 'transparent',
          width,
          height,
        },
      ]}>
      <RoundedRect
        // Shift the drawn box inward by shadowSpace.dx, shadowSpace.dy
        // to avoid clipping the shadow edges.
        x={shadowSpace}
        y={shadowSpace}
        width={width - shadowSpace * 2}
        height={height - shadowSpace * 2}
        r={boxRadius}
        color={backgroundColor} // The background fill of the rect
      >
        {/*
          Main Shadow:
          ------------
          - `dx` and `dy` control how far the shadow shifts horizontally and vertically.
          - `blur` controls the softness and spread of the shadow.
          - `color` provides the shadow’s tint and transparency.
          - `inner` set to `true` makes the shadow appear inside the rectangle edges
            (inset shadow), rather than outside.
        */}
        <Shadow
          dx={shadowOffset.width}
          dy={shadowOffset.height}
          blur={shadowBlur}
          color={shadowColor}
          inner={inset}
        />

        {/*
          Reflected Light (Highlight):
          ----------------------------
          If enabled, a second Shadow is drawn (also inset) to simulate
          light reflecting from the opposite side of the shadow. This
          can add a subtle or dramatic “3D” effect depending on the
          offset, blur, and color used.
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
