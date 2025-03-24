// useShadowProperties.tsx
import { useMemo, useState } from 'react';
import {
  StyleSheet,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import {
  getBackgroundColor,
  computeShadowProperties,
  isLinearProps,
  numerify,
  getOuterShadowOffset,
} from '../utils';
import type { ShadowProps } from '../types';
import type { GradientLinearProps } from '../../lib/typescript/module/src/types';

interface UseShadowPropertiesParams extends ShadowProps {
  propWidth?: number;
  propHeight?: number;
  style?: ViewStyle;
  backgroundColor?: string;
  propsOnLayout?: (e: LayoutChangeEvent) => void;
}

interface ShadowPropertiesResult {
  flatStyle: ReturnType<typeof StyleSheet.flatten>;
  bgColor: string;
  shadowProps: ReturnType<typeof computeShadowProperties>;
  isLinear: boolean;
  layout: { width: number; height: number };
  outerShadowOffset?: object;
  canRenderCanvas: boolean;
  onLayout: (e: LayoutChangeEvent) => void;
}

export const useShadowProperties = ({
  propWidth,
  propHeight,
  style,
  backgroundColor,
  shadowOffset,
  shadowColor,
  shadowBlur,
  reflectedLightOffset,
  reflectedLightColor,
  reflectedLightBlur,
  inset,
  propsOnLayout,
  ...props
}:
  | UseShadowPropertiesParams
  | (UseShadowPropertiesParams &
      GradientLinearProps)): ShadowPropertiesResult => {
  // Flatten styles
  const flatStyle = useMemo(() => StyleSheet.flatten(style) || {}, [style]);

  // Get background color
  const bgColor = useMemo(
    () =>
      getBackgroundColor({
        backgroundColor,
        styleBackground: flatStyle.backgroundColor,
      }),
    [backgroundColor, flatStyle.backgroundColor]
  );

  // Compute shadow properties
  const shadowProps = useMemo(
    () =>
      computeShadowProperties({
        shadowOffset,
        shadowColor,
        shadowBlur,
        reflectedLightOffset,
        reflectedLightColor,
        reflectedLightBlur,
      }),
    [
      shadowOffset,
      shadowColor,
      shadowBlur,
      reflectedLightOffset,
      reflectedLightColor,
      reflectedLightBlur,
    ]
  );

  // Check if linear gradient props are provided
  const isLinear = isLinearProps(props);

  // Handle layout
  const initialW = propWidth ?? numerify(flatStyle.width, 0);
  const initialH = propHeight ?? numerify(flatStyle.height, 0);
  const [layout, setLayout] = useState({ width: initialW, height: initialH });

  // Create onLayout handler
  const onLayout = useMemo(
    () => (e: LayoutChangeEvent) => {
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

  // Create outer shadow offset if needed
  const outerShadowOffset = useMemo(
    () =>
      inset !== undefined
        ? getOuterShadowOffset({
            ...shadowProps,
            inset,
          })
        : undefined,
    [shadowProps, inset]
  );

  // Check if canvas can be rendered
  const canRenderCanvas = Boolean(layout.width && layout.height);

  return {
    flatStyle,
    bgColor,
    shadowProps,
    isLinear,
    layout,
    outerShadowOffset,
    canRenderCanvas,
    onLayout,
  };
};
