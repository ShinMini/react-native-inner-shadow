import React from 'react';
import { RoundedRect, type InputRRect } from '@shopify/react-native-skia';

import type { ViewStyle } from 'react-native';
import { getBorderRadius } from '../utils';
import type { SharedValue } from 'react-native-reanimated';

type CornerRadiiProps = {
  width: number;
  height: number;
  style?: ViewStyle;
  backgroundColor: SharedValue<string> | string;
  children?: React.ReactNode;
};
export const CornerRadii = React.memo(function CornerRadii({
  width,
  height,
  style,
  children,
  backgroundColor,
}: CornerRadiiProps) {
  const rrct = React.useMemo(() => {
    const {
      topLeftRadius,
      topRightRadius,
      bottomRightRadius,
      bottomLeftRadius,
    } = getBorderRadius(style);

    return {
      rect: { x: 0, y: 0, width: width, height: height },
      topLeft: { x: topLeftRadius, y: topLeftRadius },
      topRight: { x: topRightRadius, y: topRightRadius },
      bottomRight: { x: bottomRightRadius, y: bottomRightRadius },
      bottomLeft: { x: bottomLeftRadius, y: bottomLeftRadius },
    } satisfies InputRRect;
  }, [width, height, style]);

  return (
    <RoundedRect rect={rrct} color={backgroundColor}>
      {children}
    </RoundedRect>
  );
});
