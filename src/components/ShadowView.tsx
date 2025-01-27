import { useState, useCallback, useMemo } from 'react';
import type { LayoutChangeEvent, ViewStyle } from 'react-native';

import {
  createOuterShadowOffset,
  createStyles,
  getBackgroundColor,
  getShadowProperty,
  isLinearProps,
} from '../utils';
import type { InnerShadowProps, LinearInnerShadowProps } from '../types';
import { COMMON_STYLES } from '../constants';

import Animated from 'react-native-reanimated';
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import LinearGradientFill from './ShadowLinearGradientFill';

/**
 * A unified interface for both "solid" (InnerShadow) and "linear" (LinearShadow).
 * We automatically detect "linear mode" by checking if the user provides
 * gradient props (colors, from, to, etc.).
 */
function UnifiedShadowView(props: InnerShadowProps | LinearInnerShadowProps) {
  /** 1) Extract essential props & compute defaults */
  const backgroundColor = getBackgroundColor(props);
  const shadowProps = getShadowProperty(props);
  const isLinear = isLinearProps(props);

  /**
   * If isReflectedLightEnabled is undefined, default to props.inset
   * for the typical "inset = highlight" usage.
   */
  const isReflectedLightEnabled = props.isReflectedLightEnabled ?? props.inset;

  /** 2) Extract width/height from style if provided */
  const styleWidth =
    props.style && ((props.style as ViewStyle).width as number | undefined);
  const styleHeight =
    props.style && ((props.style as ViewStyle).height as number | undefined);

  /** 3) Border radius logic (uniform only) */
  const borderRadius =
    Number((props.style as ViewStyle)?.borderRadius ?? 0) || 0;

  /** 4) Local state for measuring if needed */
  const [layoutSize, setLayoutSize] = useState({ width: 0, height: 0 });

  /**
   * Only measure if user hasn't explicitly set width/height in style,
   * to avoid repeated re-renders.
   */
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (!styleWidth || !styleHeight) {
        const { width, height } = e.nativeEvent.layout;
        if (width !== layoutSize.width || height !== layoutSize.height) {
          setLayoutSize({ width, height });
        }
      }
    },
    [styleWidth, styleHeight, layoutSize]
  );

  /** 5) Final dimensions we use for the Canvas */
  const finalWidth = styleWidth ?? layoutSize.width;
  const finalHeight = styleHeight ?? layoutSize.height;

  /**
   * We only render the Canvas if we have a valid size
   * (prevents flicker or wasted draws when size = 0).
   */
  const canRenderCanvas = finalWidth > 0 && finalHeight > 0;

  /** 6) Memoize style objects if needed */
  const canvasStyle = useMemo(
    () =>
      createStyles({
        width: finalWidth,
        height: finalHeight,
      }),
    [finalWidth, finalHeight]
  );

  const outerShadowOffset = useMemo(
    () => createOuterShadowOffset(shadowProps),
    [shadowProps]
  );

  /** 7) Render Flow */
  return (
    <Animated.View
      {...props}
      style={[
        props.style,
        COMMON_STYLES.canvasWrapper,
        outerShadowOffset, // Possibly sets outer drop-shadow if needed
      ]}
      onLayout={onLayout}
    >
      {canRenderCanvas && (
        <Canvas style={[canvasStyle.canvas]}>
          <RoundedRect
            x={0}
            y={0}
            width={finalWidth}
            height={finalHeight}
            r={borderRadius}
            color={backgroundColor}
          >
            {/** If we are in "linear" mode, draw the linear gradient fill */}
            {isLinear && (
              <LinearGradientFill
                width={finalWidth}
                height={finalHeight}
                {...props} // from, to, colors, etc.
              />
            )}

            {/** Inset main shadow if props.inset is true */}
            {props.inset && (
              <Shadow
                dx={shadowProps.shadowOffset.width}
                dy={shadowProps.shadowOffset.height}
                blur={shadowProps.shadowBlur}
                color={shadowProps.shadowColor}
                inner
              />
            )}

            {/** Optional highlight reflection if isReflectedLightEnabled */}
            {isReflectedLightEnabled && (
              <Shadow
                dx={shadowProps.reflectedLightOffset.width}
                dy={shadowProps.reflectedLightOffset.height}
                blur={shadowProps.reflectedLightBlur}
                color={shadowProps.reflectedLightColor}
                inner
              />
            )}
          </RoundedRect>
        </Canvas>
      )}

      {/** Any children appear on top of the canvas */}
      {props.children}
    </Animated.View>
  );
}

/**
 * ShadowView: for a basic “solid” background shadow
 * (no gradient props).
 */
export function ShadowView(props: InnerShadowProps) {
  return <UnifiedShadowView {...props} />;
}

/**
 * LinearShadowView: for a linear gradient background shadow
 * (requires e.g. colors, from, to).
 */
export function LinearShadowView(props: LinearInnerShadowProps) {
  return <UnifiedShadowView {...props} />;
}

/**
 * Publicly exported components:
 * - ShadowView: for standard solid shadows.
 * - LinearShadowView: for gradient-based shadows.
 *
 * Under the hood, both use the same "UnifiedShadowView".
 */
