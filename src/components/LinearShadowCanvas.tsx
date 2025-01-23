import { useMemo } from 'react';
import {
  Canvas,
  LinearGradient,
  vec,
  RoundedRect,
  Shadow,
} from '@shopify/react-native-skia';
import type { LinearShadowCanvasProps } from '../types';

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

  const top = vec(width / 2, 0);
  const bottom = vec(width / 2, height);

  const left = vec(0, height / 2);
  const right = vec(width, height / 2);

  const direction = { top, bottom, left, right };

  const outerShadowOffset = useMemo(() => {
    if (!inset) {
      return {
        shadowColor: inset ? 'transparent' : shadowColor,
        shadowOffset,
        // blur: 0 ~ 20, opacity: 0 ~ 1
        shadowOpacity: shadowBlur / 20,
      };
    }
    return null;
  }, [inset, shadowColor, shadowBlur, shadowOffset]);

  return (
    <Canvas
      style={[
        outerShadowOffset,
        style,
        {
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: 'transparent',
          width,
          height,
        },
      ]}
    >
      <RoundedRect x={0} y={0} width={width} height={height} r={boxRadius}>
        <LinearGradient
          start={direction[from]}
          end={direction[to]}
          colors={colors}
        />
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
