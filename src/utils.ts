import { StyleSheet } from 'react-native';

import { vec } from '@shopify/react-native-skia';

import type {
  InnerShadowProps,
  LINEAR_DIRECTION,
  LinearInnerShadowProps,
} from './types';
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_REFLECTED_LIGHT_BLUR,
  DEFAULT_REFLECTED_LIGHT_COLOR,
  DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE,
  DEFAULT_SHADOW_BLUR,
  DEFAULT_SHADOW_COLOR,
  DEFAULT_SHADOW_OFFSET_SCALE,
} from './constants';

/**
 *  createStyles generates the StyleSheet object for the canvas
 *
 * @param width - The width of the canvas
 * @param height - The height of the canvas
 * @returns The StyleSheet object for the canvas
 */
export function createStyles({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return StyleSheet.create({
    canvas: {
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: 'transparent',
      width,
      height,
    } as const,
  });
}

/**
 * getBackgroundColor retrieves the final background color
 * from either:
 *   1) props.backgroundColor
 *   2) style.backgroundColor
 *   3) DEFAULT_BACKGROUND_COLOR
 *
 * This ensures there is always a valid color for the component’s background.
 */
export function getBackgroundColor(
  props: Pick<InnerShadowProps, 'backgroundColor' | 'style'>
) {
  const backgroundColor =
    props.backgroundColor ??
    props.style?.backgroundColor ??
    DEFAULT_BACKGROUND_COLOR;

  return backgroundColor as string;
}

/**
 * getShadowProperty determines the final configuration for both
 * the main shadow and any reflected light. It merges default values
 * with provided props to form a complete “shadow settings” object.
 *
 * - shadowOffset / reflectedLightOffset: how far the shadows/highlights
 *   are shifted in x and y.
 * - shadowColor / reflectedLightColor: colors used for each effect.
 * - shadowBlur / reflectedLightBlur: blur radius for the softness/spread
 *   of the shadow or highlight.
 *
 * @param props - The props object containing shadow-related settings.
 * @returns {
 * shadowOffset, reflectedLightOffset, shadowColor, reflectedLightColor, shadowBlur, reflectedLightBlur}
 */
export function getShadowProperty({
  inset,
  shadowOffset,
  shadowBlur,
  shadowColor,
  reflectedLightOffset,
  reflectedLightBlur,
  reflectedLightColor,
}: Omit<InnerShadowProps, 'children'>) {
  const SHADOW_OFFSET_WIDTH =
    shadowOffset?.width ?? DEFAULT_SHADOW_OFFSET_SCALE;
  const SHADOW_OFFSET_HEIGHT =
    shadowOffset?.height ?? DEFAULT_SHADOW_OFFSET_SCALE;

  // By default, the reflected light offset is the inverse of the main shadow
  // so it appears on the opposite corner/side.
  // when `inset` property is `true`, the reflected light offset is opposite to the shadow offset
  const REFLECTED_LIGHT_OFFSET_WIDTH = setReflectedLightDirectionAndScale({
    inset,
    reflectedOffset: reflectedLightOffset?.width,
    shadowOffset: SHADOW_OFFSET_WIDTH,
  });

  const REFLECTED_LIGHT_OFFSET_HEIGHT = setReflectedLightDirectionAndScale({
    inset,
    reflectedOffset: reflectedLightOffset?.height,
    shadowOffset: SHADOW_OFFSET_HEIGHT,
  });

  // "Blur" here maps to how soft or large the shadow/highlight is.
  // The higher the number, the more diffuse the effect.
  const _shadowBlur = Math.max(shadowBlur ?? DEFAULT_SHADOW_BLUR, 0);
  const _reflectedLightBlur = Math.max(
    reflectedLightBlur ?? DEFAULT_REFLECTED_LIGHT_BLUR,
    0
  );

  // Fallback to the provided defaults if the user doesn't specify a color.
  const _shadowColor = shadowColor ?? DEFAULT_SHADOW_COLOR;
  const _reflectedLightColor =
    reflectedLightColor ?? DEFAULT_REFLECTED_LIGHT_COLOR;

  // Construct the final offsets as objects for clarity.
  const _shadowOffset = {
    width: SHADOW_OFFSET_WIDTH,
    height: SHADOW_OFFSET_HEIGHT,
  };
  const _reflectedLightOffset = {
    width: REFLECTED_LIGHT_OFFSET_WIDTH,
    height: REFLECTED_LIGHT_OFFSET_HEIGHT,
  };

  return {
    shadowOffset: _shadowOffset,
    reflectedLightOffset: _reflectedLightOffset,
    shadowColor: _shadowColor,
    reflectedLightColor: _reflectedLightColor,
    shadowBlur: _shadowBlur,
    reflectedLightBlur: _reflectedLightBlur,
  };
}

function setReflectedLightDirectionAndScale({
  inset,
  reflectedOffset,
  shadowOffset,
}: {
  inset?: boolean;
  reflectedOffset?: number;
  shadowOffset: number;
}) {
  // When user provides a reflected light offset, use that.
  if (reflectedOffset !== undefined) {
    return reflectedOffset;
  }

  // When shadow is 0, reflected light should be 0.
  if (shadowOffset === 0) {
    return 0;
  }

  // When inset is true, the reflected light should be opposite the shadow.
  if (inset) {
    return (
      -(shadowOffset * DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE) / shadowOffset
    );
  }
  return (shadowOffset * DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE) / shadowOffset;
}

interface OuterShadowOffsetProps {
  inset: boolean;
  shadowOffset: { width: number; height: number };
  shadowColor: string;
  shadowBlur: number;
}
export function createOuterShadowOffset({
  inset,
  shadowColor,
  shadowOffset,
  shadowBlur,
}: OuterShadowOffsetProps) {
  if (!inset) {
    return {
      shadowColor,
      shadowOffset,
      // blur: 0 ~ 20, opacity: 0 ~ 1
      shadowOpacity: shadowBlur ? shadowBlur / 5 : 0.6,
      shadowRadius: shadowBlur * 0.6,
      elevation: shadowBlur,
    };
  }
  return {};
}

interface GetLinearDirectionProps {
  width: number;
  height: number;
  from: LINEAR_DIRECTION;
  to: LINEAR_DIRECTION;
}

/**
 * `getLinearDirection` calculates the start and end points for a linear gradient
 * based on the provided direction (from, to).
 * The direction is specified as a string, e.g., 'top', 'bottom', 'left', 'right'.
 * The width and height are used to calculate the midpoints for each direction.
 */
export function getLinearDirection({
  width,
  height,
  from,
  to,
}: GetLinearDirectionProps) {
  const top = vec(width / 2, 0);
  const bottom = vec(width / 2, height);

  const left = vec(0, height / 2);
  const right = vec(width, height / 2);

  const direction = { top, bottom, left, right };
  return { start: direction[from], end: direction[to] };
}

/**
 * `isLinearProps` checks if the provided props are for a linear gradient.
 * If the `colors` property is an array, we assume it's a linear gradient.
 */
export function isLinearProps(
  props: InnerShadowProps | LinearInnerShadowProps
): props is LinearInnerShadowProps {
  return 'colors' in props && Array.isArray(props.colors);
}
