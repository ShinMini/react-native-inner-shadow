import React, { memo } from 'react';
import { View } from 'react-native';

import { isLinearProps } from '../utils';
import type { InnerShadowProps, LinearInnerShadowProps } from '../types';
import {
  CANVAS_PADDING,
  COMMON_STYLES,
  IS_REFLECTED_LIGHT_ENABLED,
} from '../constants';

import { Canvas, Shadow } from '@shopify/react-native-skia';
import LinearGradientFill from './ShadowLinearGradientFill';
import { CornerRadii } from './CornerRadii';

import { useShadowProperties } from './../hooks/useShadowProperties';

/**
 * A unified interface for both "solid" (InnerShadow) and "linear" (LinearShadow).
 * We automatically detect "linear mode" by checking if the user provides
 * gradient props (colors, from, to, etc.).
 */
const UnifiedShadowView = memo(function UnifiedShadowView({
  width: propWidth,
  height: propHeight,
  inset,
  isReflectedLightEnabled = IS_REFLECTED_LIGHT_ENABLED,
  style,
  onLayout: propsOnLayout,
  children,
  ...props
}: InnerShadowProps | LinearInnerShadowProps) {
  // Extract base fields
  const { flatStyle, bgColor, shadowProps, layout, canRenderCanvas, onLayout } =
    useShadowProperties({
      propWidth,
      propHeight,
      style,
      inset,
      propsOnLayout,
      ...props,
    });
  // If isReflectedLightEnabled is undefined, default to `props.inset` (typical).
  const isLinear = isLinearProps(props);

  return (
    <View
      style={[flatStyle, COMMON_STYLES.canvasContainer]}
      onLayout={onLayout}
    >
      {canRenderCanvas ? (
        <Canvas
          style={[
            COMMON_STYLES.canvas,
            {
              width: layout.width + CANVAS_PADDING * 2,
              height: layout.height + CANVAS_PADDING * 2,
            },
          ]}
        >
          <CornerRadii
            width={layout.width}
            height={layout.height}
            style={flatStyle}
            backgroundColor={bgColor}
          >
            {/* Separate linear gradient */}
            {isLinear ? (
              <LinearGradientFill
                {...props} // from, to, colors, etc.
                width={layout.width}
                height={layout.height}
              />
            ) : null}
            <Shadow
              dx={shadowProps.shadowOffset.width}
              dy={shadowProps.shadowOffset.height}
              blur={shadowProps.shadowBlur}
              color={shadowProps.shadowColor}
              inner={inset}
            />
            {isReflectedLightEnabled ? (
              <Shadow
                dx={shadowProps.reflectedLightOffset.width}
                dy={shadowProps.reflectedLightOffset.height}
                blur={shadowProps.reflectedLightBlur}
                color={shadowProps.reflectedLightColor}
                inner
              />
            ) : null}
          </CornerRadii>
        </Canvas>
      ) : null}
      <View {...props} style={COMMON_STYLES.canvasWrapper}>
        {children}
      </View>
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
