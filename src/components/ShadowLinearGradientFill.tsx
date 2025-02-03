import { LinearGradient } from '@shopify/react-native-skia';
import type { LinearInnerShadowProps } from '../types';
import { getLinearDirection } from '../utils';
import React from 'react';

/**
 * Internal helper component that draws the linear gradient.
 * You can rename this to "LinearGradientFill" or similar if you prefer.
 */
export default function LinearGradientFill({
  width = 0,
  height = 0,
  from = 'top',
  to = 'bottom',
  colors,
}: LinearInnerShadowProps) {
  const { start, end } = React.useMemo(
    () => getLinearDirection({ width, height, from, to }),
    [width, height, from, to]
  );

  return <LinearGradient start={start} end={end} colors={colors} />;
}
