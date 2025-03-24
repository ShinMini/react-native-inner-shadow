import { vec } from '@shopify/react-native-skia';

import type {
  GetBackgroundColorProps,
  GetBorderRadiusProps,
  GetLinearDirectionProps,
  GetOuterShadowOffsetProps,
  ShadowPropertyConfig,
  InnerShadowProps,
  LinearInnerShadowProps,
  ReflectedLightPositionConfig,
} from './types';

import {
  BACKGROUND_COLOR,
  REFLECTED_LIGHT_BLUR,
  REFLECTED_LIGHT_COLOR,
  REFLECTED_LIGHT_OFFSET_SCALE,
  SHADOW_BLUR,
  SHADOW_COLOR,
  SHADOW_ELEVATION,
  SHADOW_OFFSET_SCALE,
  SHADOW_OPACITY,
  SHADOW_RADIUS,
} from './constants';

/**
 * Converts a value to a number, returning a default value if the conversion fails.
 *
 * @privateRemarks
 * At this time(17.Feb.2025), we do not support the way to convert the string (percentage) to a number.
 *
 * @template T - The type of the default value.
 *
 * @param value - The value to convert to a number.
 *
 * @returns The converted number, or the default value if the conversion fails.
 */
export function numerify<T extends null | number>(
  value: unknown,
  defaultValue: T
) {
  const num = Number(value); // if value === null return 0
  return Number.isNaN(num) ? defaultValue : num;
}

export function getBorderRadius(style?: GetBorderRadiusProps) {
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
 * getBackgroundColor retrieves the final background color
 * from either:
 *   1) props.backgroundColor
 *   2) props.style.backgroundColor
 *   3) BACKGROUND_COLOR
 *
 * This ensures there is always a valid color for the component’s background.
 *
 * {@link GetBackgroundColorProps | props} - The props object containing background color settings.
 *
 * @returns The final background color for the component.
 */
export function getBackgroundColor({
  backgroundColor,
  styleBackground,
}: GetBackgroundColorProps) {
  const bgColor = backgroundColor ?? styleBackground ?? BACKGROUND_COLOR;

  return bgColor as string;
}

/**
 * computeShadowProperties determines the final configuration for both
 * the main shadow and any reflected light. It merges default values
 * with provided props to form a complete “shadow settings” object.
 *
 * - `shadowOffset` / `reflectedLightOffset`: how far the shadows/highlights
 *   are shifted in x and y.
 * - `shadowColor` / `reflectedLightColor`: colors used for each effect.
 * - `shadowBlur` / `reflectedLightBlur`: blur radius for the softness/spread
 *   of the shadow or highlight.
 *
 * {@link ShadowPropertyConfig} - The props object containing shadow-related settings.
 *
 * @returns `{
 * shadowOffset, reflectedLightOffset, shadowColor, reflectedLightColor, shadowBlur, reflectedLightBlur }`
 */
export function computeShadowProperties({
  inset,
  shadowOffset,
  shadowBlur,
  shadowColor,
  reflectedLightOffset,
  reflectedLightBlur,
  reflectedLightColor,
}: ShadowPropertyConfig) {
  const shadowOffsetX = numerify(shadowOffset?.width, SHADOW_OFFSET_SCALE);
  const shadowOffsetY = numerify(shadowOffset?.height, SHADOW_OFFSET_SCALE);

  // By default, the reflected light offset is the inverse of the main shadow
  // so it appears on the opposite corner/side.
  // when `inset` property is `true`, the reflected light offset is opposite to the shadow offset
  const reflectedLightOffsetX = calculateReflectedLightPosition({
    inset,
    reflectedLightScale: reflectedLightOffset?.width,
    baseShadowOffset: shadowOffsetX,
  });

  const reflectedLightOffsetY = calculateReflectedLightPosition({
    inset,
    reflectedLightScale: reflectedLightOffset?.height,
    baseShadowOffset: shadowOffsetY,
  });

  // "Blur" here maps to how soft or large the shadow/highlight is.
  // The higher the number, the more diffuse the effect.
  const finalShadowBlur = Math.max(shadowBlur ?? SHADOW_BLUR, 0);
  const finalReflectedLightBlur = Math.max(
    reflectedLightBlur ?? REFLECTED_LIGHT_BLUR,
    0
  );

  // Fallback to the provided defaults if the user doesn't specify a color.
  const finalShadowColor = shadowColor ?? SHADOW_COLOR;
  const finalReflectedLightColor = reflectedLightColor ?? REFLECTED_LIGHT_COLOR;

  // Construct the final offsets as objects for clarity.
  const finalShadowOffset = {
    width: shadowOffsetX,
    height: shadowOffsetY,
  };
  const finalReflectedLightOffset = {
    width: reflectedLightOffsetX,
    height: reflectedLightOffsetY,
  };

  return {
    shadowOffset: finalShadowOffset,
    reflectedLightOffset: finalReflectedLightOffset,
    shadowColor: finalShadowColor,
    reflectedLightColor: finalReflectedLightColor,
    shadowBlur: finalShadowBlur,
    reflectedLightBlur: finalReflectedLightBlur,
  };
}

function calculateReflectedLightPosition({
  inset,
  reflectedLightScale,
  baseShadowOffset,
}: ReflectedLightPositionConfig) {
  // When user provides a reflected light offset, use that. - which allows `0` and `null`
  if (reflectedLightScale !== undefined) return reflectedLightScale;

  // When shadow is 0, reflected light should be 0.
  if (baseShadowOffset === 0) return 0;

  // for matching reflected light offset direction based on inset
  const scaleFactor = (baseShadowOffset + REFLECTED_LIGHT_OFFSET_SCALE) / 2;

  // When inset is true, the reflected light should be opposite the shadow.
  return inset ? -scaleFactor : scaleFactor;
}

/**
 * `getOuterShadowOffset` calculates the outer shadow offset properties.
 *
 * {@link GetOuterShadowOffsetProps} - The props object containing outer shadow offset settings.
 *
 * @returns `{ shadowColor, shadowOffset, shadowBlur, shadowOpacity, shadowRadius, elevation, boxShadow }`
 */
export function getOuterShadowOffset({
  inset,
  shadowColor,
  shadowOffset,
  shadowBlur,
  shadowOpacity = SHADOW_OPACITY,
  shadowRadius = SHADOW_RADIUS,
  elevation = SHADOW_ELEVATION,
  boxShadow,
}: GetOuterShadowOffsetProps) {
  if (inset) return {};

  return {
    shadowColor,
    shadowOffset,
    shadowBlur,
    shadowOpacity,
    shadowRadius,
    elevation,
    boxShadow,
  };
}

/**
 * `getLinearDirection` calculates the start and end points for a linear gradient
 * based on the provided direction (from, to).
 *
 * - The direction is specified as a string, e.g., 'top', 'bottom', 'left', 'right'.
 * - The width and height are used to calculate the midpoints for each direction.
 *
 * {@link GetLinearDirectionProps} - The props object containing linear direction settings.
 *
 * @returns `{ start, end }`
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
 *
 * @param props - see {@link InnerShadowProps} and {@link LinearInnerShadowProps}
 *
 * @returns `true` if the props are for a linear gradient, `false` otherwise.
 */
export function isLinearProps(
  props: InnerShadowProps | LinearInnerShadowProps
): props is LinearInnerShadowProps {
  return 'colors' in props && Array.isArray(props.colors);
}
