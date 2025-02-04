import React from 'react';
import { View } from 'react-native';

import {
  createOuterShadowOffset,
  createStyles,
  getBackgroundColor,
  getShadowProperty,
  isLinearProps,
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
function UnifiedShadowView({
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
  ...props
}: InnerShadowProps | LinearInnerShadowProps) {
  const [layoutSize, setLayoutSize] = React.useState({ width: 0, height: 0 });
  const targetRef = React.useRef<View>(null);

  const _backgroundColor = React.useMemo(
    () =>
      getBackgroundColor({
        backgroundColor,
        style,
      }),
    [backgroundColor, style]
  );
  const shadowProps = React.useMemo(
    () =>
      getShadowProperty({
        inset,
        shadowOffset,
        shadowBlur,
        shadowColor,
        reflectedLightOffset,
        reflectedLightBlur,
        reflectedLightColor,
      }),
    [
      inset,
      shadowOffset,
      shadowColor,
      shadowBlur,
      reflectedLightOffset,
      reflectedLightColor,
      reflectedLightBlur,
    ]
  );

  const _isReflectedLightEnabled = React.useMemo(
    () => isReflectedLightEnabled ?? inset,
    [isReflectedLightEnabled, inset]
  );
  const isLinear = isLinearProps(props);

  const canvasStyle = React.useMemo(
    () =>
      createStyles({
        width: layoutSize.width,
        height: layoutSize.height,
      }),
    [layoutSize.width, layoutSize.height]
  );

  const outerShadowOffset = React.useMemo(
    () =>
      createOuterShadowOffset({
        inset: !!inset,
        ...shadowProps,
      }),
    [shadowProps, inset]
  );

  React.useLayoutEffect(() => {
    if (!targetRef.current) return;
    if (width && height) {
      setLayoutSize({ width, height });
      return;
    }
    targetRef.current?.measure((_x, _y, _width, _height, _pageX, _pageY) => {
      setLayoutSize({ width: _width, height: _height });
    });
  }, [setLayoutSize, targetRef, width, height]);

  /** 6) Render Flow */
  return (
    <View
      ref={targetRef}
      {...props}
      style={[
        style,
        COMMON_STYLES.canvasWrapper,
        outerShadowOffset, // Possibly sets outer drop-shadow if needed
      ]}
    >
      {layoutSize.width > 0 && layoutSize.height > 0 && (
        <Canvas style={canvasStyle.canvas}>
          <CornerRadii
            width={layoutSize.width}
            height={layoutSize.height}
            style={style}
            backgroundColor={_backgroundColor}
          >
            {/** If we are in "linear" mode, draw the linear gradient fill */}
            {isLinear && (
              <LinearGradientFill
                width={layoutSize.width}
                height={layoutSize.height}
                {...props} // from, to, colors, etc.
              />
            )}

            {/** Inset main shadow if props.inset is true */}
            {inset && (
              <Shadow
                dx={shadowProps.shadowOffset.width}
                dy={shadowProps.shadowOffset.height}
                blur={shadowProps.shadowBlur}
                color={shadowProps.shadowColor}
                inner
              />
            )}

            {/** Optional highlight reflection if isReflectedLightEnabled */}
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

      {/** Any children appear on top of the canvas */}
      {props.children}
    </View>
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
