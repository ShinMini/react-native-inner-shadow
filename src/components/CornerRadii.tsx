import React from 'react';
import { Group, Rect } from '@shopify/react-native-skia';

import type { ViewStyle } from 'react-native';
import { getBorderRadius } from '../utils';

type CornerRadiiProps = {
  width: number;
  height: number;
  style?: ViewStyle;
  backgroundColor: string;
  children?: React.ReactNode;
};
export const CornerRadii = React.memo(function CornerRadii({
  width,
  height,
  style,
  children,
  backgroundColor,
}: CornerRadiiProps) {
  const roundedClip = React.useMemo(() => {
    const {
      topLeftRadius,
      topRightRadius,
      bottomRightRadius,
      bottomLeftRadius,
    } = getBorderRadius(style);

    return makeRoundedRectPath(
      width,
      height,
      topLeftRadius,
      topRightRadius,
      bottomRightRadius,
      bottomLeftRadius
    );
  }, [width, height, style]);

  return (
    <Group clip={roundedClip}>
      <Rect x={0} y={0} width={width} height={height} color={backgroundColor}>
        {children}
      </Rect>
    </Group>
  );
});

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
