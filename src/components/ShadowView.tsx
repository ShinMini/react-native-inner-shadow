import React, { memo, useMemo, useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

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
  width: propWidth,
  height: propHeight,
  inset,
  isReflectedLightEnabled,
  style,
  backgroundColor,
  shadowOffset,
  shadowColor,
  shadowBlur,
  reflectedLightOffset,
  reflectedLightColor,
  reflectedLightBlur,
  onLayout: propsOnLayout,
  children,
  ...props
}: InnerShadowProps | LinearInnerShadowProps) {
  // Extract base fields
  const flatStyle = useMemo(() => StyleSheet.flatten(style) || {}, [style]);
  const bgColor = getBackgroundColor({
    backgroundColor,
    styleBackground: flatStyle.backgroundColor,
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

  const initialW = propWidth ?? numerify(flatStyle.width, 0);
  const initialH = propHeight ?? numerify(flatStyle.height, 0);
  const [layout, setLayout] = useState({ width: initialW, height: initialH });

  const onLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      propsOnLayout?.(e);
      if (initialW && initialH) return;
      const { width, height } = e.nativeEvent.layout;
      setLayout((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height }
      );
    },
    [initialW, initialH, propsOnLayout]
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

  // 현재 적용할 실제 크기 (명시 prop 우선, 아니면 측정값)
  const finalWidth = layout.width;
  const finalHeight = layout.height;

  const canRenderCanvas = finalWidth && finalHeight;

  return (
    <View
      {...props}
      style={[
        outerShadowOffset, // Possibly sets outer drop-shadow if needed
        COMMON_STYLES.canvasWrapper,
        style,
      ]}
      onLayout={onLayout}
    >
      {canRenderCanvas ? (
        <Canvas
          style={[
            COMMON_STYLES.canvas,
            { width: finalWidth, height: finalHeight },
          ]}
        >
          <CornerRadii
            width={finalWidth}
            height={finalHeight}
            style={style}
            backgroundColor={bgColor}
          >
            {isLinear && (
              <LinearGradientFill
                {...props} // from, to, colors, etc.
                width={finalWidth}
                height={finalHeight}
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
      ) : null}
      {children}
    </View>
  );
});

/**
 * ShadowView: for a basic “solid” background shadow(no gradient props).
 *
 * @remarks
 * See {@link InnerShadowProps} for a linear gradient background shadow.
 *
 * @example
 * ```ts
 * <ShadowView style={styles.shadowView} inset>
 *   <Text>ShadowView</Text>
 * </ShadowView>
 * ```
 */
export const ShadowView: React.FC<InnerShadowProps> = UnifiedShadowView;

/**
 * LinearShadowView: for a linear gradient background shadow
 * (requires e.g. colors, from, to).
 *
 * @remarks
 * See {@link LinearInnerShadowProps} for a solid background shadow.
 *
 * @example
 * ```ts
 *  <LinearShadowView
 *    style={styles.shadowView}
 *    colors={['#f1c40f', '#e74c3c']}
 *    from="top"
 *  >
 *    <Text>LinearShadowView</Text>
 *  </LinearShadowView>
 * ```
 */
export const LinearShadowView: React.FC<LinearInnerShadowProps> =
  UnifiedShadowView;
