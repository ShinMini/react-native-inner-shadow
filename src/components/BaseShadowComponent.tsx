import { memo } from 'react';
import { View } from 'react-native';

import type {
  InnerShadowProps,
  LinearInnerShadowProps,
  RadialInnerShadowProps,
} from '../types';
import {
  CANVAS_PADDING,
  COMMON_STYLES,
  IS_REFLECTED_LIGHT_ENABLED,
} from '../constants';

import { Canvas, Shadow } from '@shopify/react-native-skia';
import { CornerRadii } from './shapes/CornerRadii';

import { useShadowProperties } from './../hooks/useShadowProperties';
import { isLinearProps } from '../utils';
import LinearGradientFill from './shapes/ShadowLinearGradientFill';

/**
 * A unified interface for both "solid" (InnerShadow) and "linear" (LinearShadow).
 * We automatically detect "linear mode" by checking if the user provides
 * gradient props (colors, from, to, etc.).
 */
export const BaseShadowComponent = memo(function BaseShadowComponent({
  width: propWidth,
  height: propHeight,
  inset,
  isReflectedLightEnabled = IS_REFLECTED_LIGHT_ENABLED,
  style,
  onLayout: propsOnLayout,
  children,
  ...props
}: InnerShadowProps | LinearInnerShadowProps | RadialInnerShadowProps) {
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

  const isLinear = isLinearProps(props);

  return (
    <View
      style={[flatStyle, COMMON_STYLES.canvasContainer]}
      onLayout={onLayout}
    >
      {canRenderCanvas && (
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
            {isLinear && (
              <LinearGradientFill
                {...props}
                width={layout.width}
                height={layout.height}
              />
            )}
            <Shadow
              dx={shadowProps.shadowOffset.width}
              dy={shadowProps.shadowOffset.height}
              blur={shadowProps.shadowBlur}
              color={shadowProps.shadowColor}
              inner={inset}
            />
            {isReflectedLightEnabled && (
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
