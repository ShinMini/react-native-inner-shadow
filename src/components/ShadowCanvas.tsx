import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import type { ShadowCanvasProps } from '../types';
import { createOuterShadowOffset, createStyles } from '../utils';
import { useMemo } from 'react';

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
}: ShadowCanvasProps) {
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
  const boxRadius = Number(style ? style.borderRadius : 0) || 0;
  const styles = createStyles({ width, height });

  // Prepare the shadow offset and blur for the main shadow layer.
  // You can overwrite these values with `style` property.
  const outerShadowOffset = useMemo(
    () =>
      createOuterShadowOffset({
        inset,
        shadowColor,
        shadowBlur,
        shadowOffset,
      }),
    [inset, shadowColor, shadowBlur, shadowOffset]
  );

  return (
    <Canvas style={[outerShadowOffset, style, styles.canvas]}>
      <RoundedRect
        x={0}
        y={0}
        width={width}
        height={height}
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
        {inset && (
          <Shadow
            dx={shadowOffset.width}
            dy={shadowOffset.height}
            blur={shadowBlur}
            color={shadowColor}
            inner
          />
        )}

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
            inner
          />
        )}
      </RoundedRect>
    </Canvas>
  );
}
