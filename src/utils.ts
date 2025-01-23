import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_SHADOW_OFFSET_SCALE,
  DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE,
  DEFAULT_SHADOW_BLUR,
  DEFAULT_REFLECTED_LIGHT_BLUR,
  DEFAULT_SHADOW_COLOR,
  DEFAULT_REFLECTED_LIGHT_COLOR,
  type InnerShadowProps,
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
  props: Pick<InnerShadowProps, 'backgroundColor' | 'style' | 'children'>
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
  // when `inset` property is `true`, the reflected light offset is opposite to the shadow offset
  const REFLECTED_LIGHT_OFFSET_WIDTH = setReflectedLightDirectionAndScale({
    inset: props.inset,
    reflectedOffset: props.reflectedLightOffset?.width,
    shadowOffset: SHADOW_OFFSET_WIDTH,
  });

  const REFLECTED_LIGHT_OFFSET_HEIGHT = setReflectedLightDirectionAndScale({
    inset: props.inset,
    reflectedOffset: props.reflectedLightOffset?.height,
    shadowOffset: SHADOW_OFFSET_HEIGHT,
  });

  // "Blur" here maps to how soft or large the shadow/highlight is.
  // The higher the number, the more diffuse the effect.
  const shadowBlur = Math.max(props.shadowBlur ?? DEFAULT_SHADOW_BLUR, 0);
  const reflectedLightBlur = Math.max(
    props.reflectedLightBlur ?? DEFAULT_REFLECTED_LIGHT_BLUR,
    0
  );

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
