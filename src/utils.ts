import {
  InnerShadowProps,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_SHADOW_OFFSET_SCALE,
  DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE,
  DEFAULT_SHADOW_BLUR,
  DEFAULT_REFLECTED_LIGHT_BLUR,
  DEFAULT_SHADOW_COLOR,
  DEFAULT_REFLECTED_LIGHT_COLOR,
} from './types';

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
  props: Pick<InnerShadowProps, 'backgroundColor' | 'style' | 'children'>,
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
export function getShadowProperty(props: Omit<InnerShadowProps, 'children'>) {
  const SHADOW_OFFSET_WIDTH =
    props.shadowOffset?.width ?? DEFAULT_SHADOW_OFFSET_SCALE;
  const SHADOW_OFFSET_HEIGHT =
    props.shadowOffset?.height ?? DEFAULT_SHADOW_OFFSET_SCALE;

  // By default, the reflected light offset is the inverse of the main shadow
  // so it appears on the opposite corner/side.
  const REFLECTED_LIGHT_OFFSET_WIDTH =
    props.reflectedLightOffset?.width ??
    (-SHADOW_OFFSET_WIDTH * DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE !== 0
      ? (-SHADOW_OFFSET_WIDTH * DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE) /
        SHADOW_OFFSET_WIDTH
      : 0);

  const REFLECTED_LIGHT_OFFSET_HEIGHT =
    props.reflectedLightOffset?.height ??
    (-SHADOW_OFFSET_HEIGHT * DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE !== 0
      ? (-SHADOW_OFFSET_HEIGHT * DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE) /
        SHADOW_OFFSET_HEIGHT
      : 0);

  // "Blur" here maps to how soft or large the shadow/highlight is.
  // The higher the number, the more diffuse the effect.
  const shadowBlur = props.shadowBlur ?? DEFAULT_SHADOW_BLUR;
  const reflectedLightBlur =
    props.reflectedLightBlur ?? DEFAULT_REFLECTED_LIGHT_BLUR;

  // Fallback to the provided defaults if the user doesn't specify a color.
  const shadowColor = props.shadowColor ?? DEFAULT_SHADOW_COLOR;
  const reflectedLightColor =
    props.reflectedLightColor ?? DEFAULT_REFLECTED_LIGHT_COLOR;

  // Construct the final offsets as objects for clarity.
  const shadowOffset = {
    width: SHADOW_OFFSET_WIDTH,
    height: SHADOW_OFFSET_HEIGHT,
  };
  const reflectedLightOffset = {
    width: REFLECTED_LIGHT_OFFSET_WIDTH,
    height: REFLECTED_LIGHT_OFFSET_HEIGHT,
  };

  return {
    shadowOffset,
    reflectedLightOffset,
    shadowColor,
    reflectedLightColor,
    shadowBlur,
    reflectedLightBlur,
  };
}
