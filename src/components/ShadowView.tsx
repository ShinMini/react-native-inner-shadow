import React, { memo } from 'react';
import { View } from 'react-native';

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
  style,
  ...props
}: InnerShadowProps | LinearInnerShadowProps | RadialInnerShadowProps) {
  // Extract base fields
  return (
    <View {...props} style={[style, COMMON_STYLES.canvasWrapper]}>
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
export const ShadowView: React.FC<InnerShadowProps> = ({
  children,
  ...props
}) => {
  return (
    <BaseShadowComponent {...props}>
      <UnifiedShadowView {...props}>{children}</UnifiedShadowView>
    </BaseShadowComponent>
  );
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
  children,
  from = 'top',
  to = 'bottom',
  ...props
}) => {
  return (
    <BaseShadowComponent {...props} from={from} to={to}>
      <UnifiedShadowView {...props}>{children}</UnifiedShadowView>
    </BaseShadowComponent>
  );
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
  children,
  center = { x: 0.5, y: 0.5 },
  radius = 0.5,
  ...props
}) => {
  return (
    <BaseShadowComponent {...props} center={center} radius={radius}>
      <UnifiedShadowView {...props}>{children}</UnifiedShadowView>
    </BaseShadowComponent>
  );
};
