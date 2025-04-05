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
} from '../utils';
import type { ShadowProps, GradientLinearProps } from '../types';
import {
  SHADOW_BLUR,
  REFLECTED_LIGHT_BLUR,
  REFLECTED_LIGHT_COLOR,
  SHADOW_COLOR,
} from '../constants';

interface UseShadowPropertiesParams extends ShadowProps {
  propWidth?: number;
  propHeight?: number;
  style?: ViewStyle;
  backgroundColor?: string;
  propsOnLayout?: (e: LayoutChangeEvent) => void;
}

interface ShadowPropertiesResult {
  flatStyle?: ViewStyle;
  bgColor: string;
  shadowProps: ReturnType<typeof computeShadowProperties>;
  isLinear: boolean;
  layout: { width: number; height: number };
  canRenderCanvas: boolean;
  onLayout: (e: LayoutChangeEvent) => void;
}

export const useShadowProperties = ({
  propWidth,
  propHeight,
  style,
  backgroundColor,
  shadowOffset,
  shadowColor = SHADOW_COLOR,
  shadowBlur = SHADOW_BLUR,
  reflectedLightOffset,
  reflectedLightColor = REFLECTED_LIGHT_COLOR,
  reflectedLightBlur = REFLECTED_LIGHT_BLUR,
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

  // Check if canvas can be rendered
  const canRenderCanvas = Boolean(layout.width && layout.height);

  return {
    flatStyle,
    bgColor,
    shadowProps,
    isLinear,
    layout,
    canRenderCanvas,
    onLayout,
  };
};
