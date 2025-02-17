import React from 'react';
import { Group, Rect } from '@shopify/react-native-skia';

import type { ViewStyle } from 'react-native';
import { getBorderRadius, makeRoundedRectPath } from '../utils';

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
