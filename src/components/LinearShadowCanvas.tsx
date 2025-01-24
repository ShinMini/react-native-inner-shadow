import {
  Canvas,
  LinearGradient,
  RoundedRect,
  Shadow,
} from '@shopify/react-native-skia';
import type { LinearShadowCanvasProps } from '../types';
import {
  createOuterShadowOffset,
  createStyles,
  getLinearDirection,
} from '../utils';
import { useMemo } from 'react';

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
}: LinearShadowCanvasProps) {
  const isReflectedLightEnabled =
    props.isReflectedLightEnabled !== undefined
      ? props.isReflectedLightEnabled
      : inset;

  const boxRadius = Number(style ? style.borderRadius : 0) || 0;

  const { start, end } = getLinearDirection({
    width,
    height,
    from,
    to,
  });

  const styles = createStyles({ width, height });

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
      <RoundedRect x={0} y={0} width={width} height={height} r={boxRadius}>
        <LinearGradient start={start} end={end} colors={colors} />
        {inset && (
          <Shadow
            dx={shadowOffset.width}
            dy={shadowOffset.height}
            blur={shadowBlur}
            color={shadowColor}
            inner
          />
        )}
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
