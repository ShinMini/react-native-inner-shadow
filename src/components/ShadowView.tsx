import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import type {
  InnerShadowProps,
  LinearInnerShadowProps,
  RadialInnerShadowProps,
} from '../types';
import { COMMON_STYLES } from '../constants';

import { BaseShadowComponent } from './BaseShadowComponent';

/**
 * A unified interface for both "solid" (InnerShadow) and "linear" (LinearShadow).
 * We automatically detect "linear mode" by checking if the user provides
 * gradient props (colors, from, to, etc.).
 */
const UnifiedShadowView = memo(function UnifiedShadowView({
  children,
  backgroundColor,
  ...props
}: InnerShadowProps | LinearInnerShadowProps | RadialInnerShadowProps) {
  const flatStyle = StyleSheet.flatten(props.style) || {};
  // Extract base fields
  return (
    <BaseShadowComponent
      {...props}
      style={flatStyle}
      backgroundColor={backgroundColor}
    >
      <View {...props} style={[flatStyle, COMMON_STYLES.canvasWrapper]}>
        {children}
      </View>
    </BaseShadowComponent>
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
export const ShadowView: React.FC<InnerShadowProps> = (props) => {
  return <UnifiedShadowView {...props} />;
};

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
export const LinearShadowView: React.FC<LinearInnerShadowProps> = ({
  from = 'top',
  to = 'bottom',
  ...props
}) => {
  return <UnifiedShadowView {...props} from={from} to={to} />;
};

/**
 * RadialShadowView: for a radial gradient background shadow
 * (requires e.g. center, radius).
 *
 * @remarks
 * See {@link RadialInnerShadowProps} for a solid background shadow.
 *
 * @example
 * ```ts
 *  <RadialShadowView
 *    style={styles.shadowView}
 *    center={{ x: 0.5, y: 0.5 }}
 *    radius={0.5}
 *    colors={['#f1c40f', '#e74c3c']}
 *  >
 *    <Text>RadialShadowView</Text>
 *  </RadialShadowView>
 * ```
 */
export const RadialShadowView: React.FC<RadialInnerShadowProps> = ({
  center = { x: 0.5, y: 0.5 },
  radius = 0.5,
  ...props
}) => {
  return <UnifiedShadowView {...props} center={center} radius={radius} />;
};
