import { type ViewStyle } from 'react-native';

import { vec } from '@shopify/react-native-skia';

import type {
  GetBackgroundColorProps,
  GetOuterShadowOffsetProps,
  GetShadowPropertyProps,
  InnerShadowProps,
  LINEAR_DIRECTION,
  LinearInnerShadowProps,
  SetReflectedLightDirectionAndScaleProps,
} from './types';

import {
  BACKGROUND_COLOR,
  REFLECTED_LIGHT_BLUR,
  REFLECTED_LIGHT_COLOR,
  REFLECTED_LIGHT_OFFSET_SCALE,
  SHADOW_BLUR,
  SHADOW_COLOR,
  SHADOW_OFFSET_SCALE,
} from './constants';

// At this time(17.Feb.2025), we do not support the way to convert the string (percentage) to a number.
export function numerify<T extends null | number>(
  value: unknown,
  defaultValue: T
) {
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
}

export function getBorderRadius(style?: Partial<ViewStyle>) {
  const borderRadius = numerify(style?.borderRadius, null);

  const topStartRadius = numerify(style?.borderTopStartRadius, borderRadius);
  const topLeftRadius = numerify(
    style?.borderTopLeftRadius,
    topStartRadius ?? 0
  );

  const topEndRadius = numerify(style?.borderTopEndRadius, borderRadius);
  const topRightRadius = numerify(
    style?.borderTopRightRadius,
    topEndRadius ?? 0
  );

  const bottomEndRadius = numerify(style?.borderBottomEndRadius, borderRadius);
  const bottomRightRadius = numerify(
    style?.borderBottomRightRadius,
    bottomEndRadius ?? 0
  );

  const bottomStartRadius = numerify(
    style?.borderBottomStartRadius,
    borderRadius
  );
  const bottomLeftRadius = numerify(
    style?.borderBottomLeftRadius,
    bottomStartRadius ?? 0
  );

  return {
    borderRadius,
    topLeftRadius,
    topRightRadius,
    bottomRightRadius,
    bottomLeftRadius,
  };
}

/**
 * Creates an SVG path string for a rectangle [0, 0, width, height]
 * with potentially different corner radii for each corner.
 *
 * If you only need one uniform radius, set all to the same value.
 */
export function makeRoundedRectPath(
  width: number,
  height: number,
  rtl: number, // top-left
  rtr: number, // top-right
  rbr: number, // bottom-right
  rbl: number // bottom-left
): string {
  // Clamping corner radii: we don't want them bigger than the rectangle size
  const w = Math.max(0, width);
  const h = Math.max(0, height);

  // radius must not exceed half of the rectangle's width/height
  const _rtl = Math.min(rtl, w / 2, h / 2);
  const _rtr = Math.min(rtr, w / 2, h / 2);
  const _rbr = Math.min(rbr, w / 2, h / 2);
  const _rbl = Math.min(rbl, w / 2, h / 2);

  return `
    M ${_rtl},0
    L ${w - _rtr},0
    A ${_rtr} ${_rtr} 0 0 1 ${w} ${_rtr}
    L ${w} ${h - _rbr}
    A ${_rbr} ${_rbr} 0 0 1 ${w - _rbr} ${h}
    L ${_rbl} ${h}
    A ${_rbl} ${_rbl} 0 0 1 0 ${h - _rbl}
    L 0 ${_rtl}
    A ${_rtl} ${_rtl} 0 0 1 ${_rtl} 0
    Z
  `.trim();
}

/**
 * getBackgroundColor retrieves the final background color
 * from either:
 *   1) props.backgroundColor
 *   2) style.backgroundColor
 *   3) BACKGROUND_COLOR
 *
 * This ensures there is always a valid color for the component’s background.
 */
export function getBackgroundColor(props: GetBackgroundColorProps) {
  const backgroundColor =
    props.backgroundColor ?? props.style?.backgroundColor ?? BACKGROUND_COLOR;

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
}: GetShadowPropertyProps) {
  const SHADOW_OFFSET_WIDTH = shadowOffset?.width ?? SHADOW_OFFSET_SCALE;
  const SHADOW_OFFSET_HEIGHT = shadowOffset?.height ?? SHADOW_OFFSET_SCALE;

  // By default, the reflected light offset is the inverse of the main shadow
  // so it appears on the opposite corner/side.
  // when `inset` property is `true`, the reflected light offset is opposite to the shadow offset
  const REFLECTED_LIGHT_OFFSET_WIDTH = setReflectedLightDirectionAndScale({
    inset,
    reflectedLightScale: reflectedLightOffset?.width,
    shadowEffectScale: SHADOW_OFFSET_WIDTH,
  });

  const REFLECTED_LIGHT_OFFSET_HEIGHT = setReflectedLightDirectionAndScale({
    inset,
    reflectedLightScale: reflectedLightOffset?.height,
    shadowEffectScale: SHADOW_OFFSET_HEIGHT,
  });

  // "Blur" here maps to how soft or large the shadow/highlight is.
  // The higher the number, the more diffuse the effect.
  const _shadowBlur = Math.max(shadowBlur ?? SHADOW_BLUR, 0);
  const _reflectedLightBlur = Math.max(
    reflectedLightBlur ?? REFLECTED_LIGHT_BLUR,
    0
  );

  // Fallback to the provided defaults if the user doesn't specify a color.
  const _shadowColor = shadowColor ?? SHADOW_COLOR;
  const _reflectedLightColor = reflectedLightColor ?? REFLECTED_LIGHT_COLOR;

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
  reflectedLightScale,
  shadowEffectScale,
}: SetReflectedLightDirectionAndScaleProps) {
  // When user provides a reflected light offset, use that.
  if (reflectedLightScale !== undefined) {
    return reflectedLightScale;
  }

  // When shadow is 0, reflected light should be 0.
  if (shadowEffectScale === 0) {
    return 0;
  }

  // When inset is true, the reflected light should be opposite the shadow.
  if (inset) {
    return (
      -(shadowEffectScale * REFLECTED_LIGHT_OFFSET_SCALE) / shadowEffectScale
    );
  }
  return (shadowEffectScale * REFLECTED_LIGHT_OFFSET_SCALE) / shadowEffectScale;
}

export function getOuterShadowOffset({
  inset,
  shadowColor,
  shadowOffset,
  shadowBlur,
}: GetOuterShadowOffsetProps) {
  if (!inset) {
    return {
      shadowColor,
      shadowOffset,
      // Map blur to opacity (0 ~ 1) and radius (more subtle scaling)
      shadowOpacity: shadowBlur ? Math.min(shadowBlur / 20, 1) : 0.3,
      shadowRadius: (shadowBlur ?? 5) * 0.8,
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
