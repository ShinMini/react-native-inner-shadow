import React, { memo } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';

import {
  getOuterShadowOffset,
  getBackgroundColor,
  getShadowProperty,
  isLinearProps,
  numerify,
} from '../utils';
import type { InnerShadowProps, LinearInnerShadowProps } from '../types';
import { COMMON_STYLES } from '../constants';

import { Canvas, Shadow } from '@shopify/react-native-skia';
import LinearGradientFill from './ShadowLinearGradientFill';
import { CornerRadii } from './CornerRadii';

/**
 * A unified interface for both "solid" (InnerShadow) and "linear" (LinearShadow).
 * We automatically detect "linear mode" by checking if the user provides
 * gradient props (colors, from, to, etc.).
 */
const UnifiedShadowView = memo(function UnifiedShadowView({
  inset,
  isReflectedLightEnabled,
  width,
  height,
  style,
  backgroundColor,
  shadowOffset,
  shadowColor,
  shadowBlur,
  reflectedLightOffset,
  reflectedLightColor,
  reflectedLightBlur,
  children,
  ...props
}: InnerShadowProps | LinearInnerShadowProps) {
  // Extract base fields
  const _backgroundColor = getBackgroundColor({
    backgroundColor,
    style,
  });
  const shadowProps = getShadowProperty({
    shadowOffset,
    shadowColor,
    shadowBlur,
    reflectedLightOffset,
    reflectedLightColor,
    reflectedLightBlur,
  });

  const isLinear = isLinearProps(props);

  // If isReflectedLightEnabled is undefined, default to `props.inset` (typical).
  const _isReflectedLightEnabled = isReflectedLightEnabled ?? inset;

  // Extract style-based width/height if present
  const styleWidth = width ?? numerify(style?.width, 0);
  const styleHeight = height ?? numerify(style?.height, 0);

  // Local state if we need to measure
  const [layoutSize, setLayoutSize] = React.useState({
    width: styleWidth,
    height: styleHeight,
  });

  // Decide if we even need to attach onLayout; turns on when width or height is: undefined, NaN, or 0
  const needMeasure = !styleWidth || !styleHeight;

  // onLayout only does something if we truly need measure
  const onLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      if (!needMeasure) return;

      const { width: w, height: h } = e.nativeEvent.layout;
      setLayoutSize({ width: w, height: h });
    },
    [needMeasure]
  );

  // Create offset style for outer shadow if needed
  const outerShadowOffset = React.useMemo(
    () =>
      getOuterShadowOffset({
        ...shadowProps,
        inset,
      }),
    [shadowProps, inset]
  );

  // Only show the canvas if we have a valid size
  const canRenderCanvas = layoutSize.width > 0 && layoutSize.height > 0;

  return (
    <View
      {...props}
      style={[
        style,
        COMMON_STYLES.canvasWrapper,
        outerShadowOffset, // Possibly sets outer drop-shadow if needed
      ]}
      onLayout={onLayout}
    >
      {canRenderCanvas && (
        <Canvas
          style={[
            COMMON_STYLES.canvas,
            { width: layoutSize.width, height: layoutSize.height },
          ]}
        >
          <CornerRadii
            width={layoutSize.width}
            height={layoutSize.height}
            style={style}
            backgroundColor={_backgroundColor}
          >
            {isLinear && (
              <LinearGradientFill
                {...props} // from, to, colors, etc.
                width={layoutSize.width}
                height={layoutSize.height}
              />
            )}

            {inset && (
              <Shadow
                dx={shadowProps.shadowOffset.width}
                dy={shadowProps.shadowOffset.height}
                blur={shadowProps.shadowBlur}
                color={shadowProps.shadowColor}
                inner
              />
            )}

            {_isReflectedLightEnabled && (
              <Shadow
                dx={shadowProps.reflectedLightOffset.width}
                dy={shadowProps.reflectedLightOffset.height}
                blur={shadowProps.reflectedLightBlur}
                color={shadowProps.reflectedLightColor}
                inner
              />
            )}
          </CornerRadii>
        </Canvas>
      )}

      {children}
    </View>
  );
});

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
