import React from 'react';
import { Group, Rect } from '@shopify/react-native-skia';

import type { ViewStyle } from 'react-native';

type CornerRadiiProps = {
  width: number;
  height: number;
  style?: ViewStyle;
  backgroundColor: string;
  children?: React.ReactNode;
};
export function CornerRadii({
  width,
  height,
  style,
  children,
  backgroundColor,
}: CornerRadiiProps) {
  const borderRadius = Number((style as ViewStyle)?.borderRadius ?? 0) || 0;

  const topLeftRadius = Number(style?.borderTopLeftRadius ?? borderRadius);
  const topRightRadius = Number(style?.borderTopRightRadius ?? borderRadius);
  const bottomRightRadius = Number(
    style?.borderBottomRightRadius ?? borderRadius
  );
  const bottomLeftRadius = Number(
    style?.borderBottomLeftRadius ?? borderRadius
  );

  const roundedClip = React.useMemo(() => {
    return makeRoundedRectPath(
      width,
      height,
      topLeftRadius,
      topRightRadius,
      bottomRightRadius,
      bottomLeftRadius
    );
  }, [
    width,
    height,
    topLeftRadius,
    topRightRadius,
    bottomRightRadius,
    bottomLeftRadius,
  ]);

  return (
    <Group clip={roundedClip}>
      <Rect x={0} y={0} width={width} height={height} color={backgroundColor}>
        {children}
      </Rect>
    </Group>
  );
}

/**
 * Creates an SVG path string for a rectangle [0, 0, width, height]
 * with potentially different corner radii for each corner.
 *
 * If you only need one uniform radius, set all to the same value.
 */
function makeRoundedRectPath(
  width: number,
  height: number,
  rtl: number, // top-left
  rtr: number, // top-right
  rbr: number, // bottom-right
  rbl: number // bottom-left
): string {
  // Clamping corner radii: we don't want them bigger than the rectangle size
  const w = Math.max(0, width);
  const h = Math.max(0, height);

  // radius must not exceed half of the rectangle's width/height
  const _rtl = Math.min(rtl, w / 2, h / 2);
  const _rtr = Math.min(rtr, w / 2, h / 2);
  const _rbr = Math.min(rbr, w / 2, h / 2);
  const _rbl = Math.min(rbl, w / 2, h / 2);

  // This path uses arcs (`Q` or `A`) to draw corners
  // We'll use the "Arc To" approach with elliptical arcs
  // “M x y” = Move to
  // “L x y” = Line to
  // “A rx ry 0 0 1 x y” = elliptical arc
  // You could also use "Q" for quadratic curves if you prefer.

  // The path goes clockwise from top-left corner:
  // 1) Move to the top-left corner (offset by _rtl).
  // 2) Line across the top.
  // 3) Arc the top-right corner.
  // 4) Line down the right side.
  // 5) Arc the bottom-right corner.
  // 6) Line across the bottom.
  // 7) Arc the bottom-left corner.
  // 8) Line up the left side.
  // 9) Arc the top-left corner back to start.

  return `
    M ${_rtl},0
    L ${w - _rtr},0
    A ${_rtr} ${_rtr} 0 0 1 ${w} ${_rtr}
    L ${w} ${h - _rbr}
    A ${_rbr} ${_rbr} 0 0 1 ${w - _rbr} ${h}
    L ${_rbl} ${h}
    A ${_rbl} ${_rbl} 0 0 1 0 ${h - _rbl}
    L 0 ${_rtl}
    A ${_rtl} ${_rtl} 0 0 1 ${_rtl} 0
    Z
  `.trim();
}
