import { LinearGradient, RadialGradient } from '@shopify/react-native-skia';
import type { GradientLinearProps, RadialGradientProps } from '../../types';
import {
  getLinearDirection,
  getRadialDirection,
  isRadialProps,
} from '../../utils';
import React from 'react';

/**
 * Internal helper component that draws the linear gradient.
 * You can rename this to "LinearGradientFill" or similar if you prefer.
 */
export default function LinearGradientFill({
  width = 0,
  height = 0,
  ...props
}: {
  width?: number;
  height?: number;
} & (GradientLinearProps | RadialGradientProps)) {
  const isRadial = isRadialProps(props);

  if (isRadial) {
    return <RadialGradientFill width={width} height={height} {...props} />;
  }

  return <LinearGradientComponent width={width} height={height} {...props} />;
}

/**
 * Internal helper component that draws the linear gradient.
 * You can rename this to "LinearGradientFill" or similar if you prefer.
 */
export function LinearGradientComponent({
  width = 0,
  height = 0,
  from = 'top',
  to = 'bottom',
  colors,
}: GradientLinearProps & {
  width: number;
  height: number;
}) {
  const { start, end } = React.useMemo(
    () => getLinearDirection({ width, height, from, to }),
    [width, height, from, to]
  );

  return <LinearGradient start={start} end={end} colors={colors} />;
}

/**
 * Internal helper component that draws the linear gradient.
 * You can rename this to "LinearGradientFill" or similar if you prefer.
 */
export function RadialGradientFill({
  width = 0,
  height = 0,
  colors,
  center,
  radius,
}: RadialGradientProps & {
  width: number;
  height: number;
}) {
  const { c, r } = React.useMemo(
    () => getRadialDirection({ width, height, center, radius }),
    [width, height, center, radius]
  );

  return <RadialGradient c={c} r={r} colors={colors} />;
}
