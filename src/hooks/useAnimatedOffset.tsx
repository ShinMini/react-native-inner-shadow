import {
  useDerivedValue,
  interpolate,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { INITIAL_DEPTH } from '../constants';
import type {
  GestureResponderEvent,
  PressableProps,
  ViewStyle,
} from 'react-native';

type UseAnimatedOffsetProps = {
  offset: { width: number; height: number };
  reflectedLightOffset: { width: number; height: number };
  blurRadius: number;
  damping: number;
  duration: number;
  onPressIn?: PressableProps['onPressIn'];
  onPressOut?: PressableProps['onPressOut'];
};

export function useAnimatedOffset(props: UseAnimatedOffsetProps) {
  const depth = useSharedValue<number>(INITIAL_DEPTH);
  const inset = useDerivedValue(() => depth.value <= 0);
  const blurRadius = useDerivedValue(() =>
    interpolate(
      depth.value,
      [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
      [props.blurRadius * props.damping, 0, props.blurRadius]
    )
  );

  const onPressIn = (event: GestureResponderEvent) => {
    depth.value = withTiming(-INITIAL_DEPTH, { duration: props.duration });
    props?.onPressIn?.(event);
  };

  const onPressOut = (event: GestureResponderEvent) => {
    depth.value = withTiming(INITIAL_DEPTH, { duration: props.duration });
    props?.onPressOut?.(event);
  };

  const offset = {
    dx: useDerivedValue(() =>
      interpolate(
        depth.value,
        [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
        [props.offset.width * props.damping, 0, props.offset.width]
      )
    ),
    dy: useDerivedValue(() =>
      interpolate(
        depth.value,
        [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
        [props.offset.height * props.damping, 0, props.offset.height]
      )
    ),
  };

  const reflectedLightOffset = {
    dx: useDerivedValue(() =>
      interpolate(
        depth.value,
        [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
        [
          -props.reflectedLightOffset.width * props.damping,
          0,
          props.reflectedLightOffset.width,
        ]
      )
    ),
    dy: useDerivedValue(() =>
      interpolate(
        depth.value,
        [-INITIAL_DEPTH, 0, INITIAL_DEPTH],
        [
          -props.reflectedLightOffset.height * props.damping,
          0,
          props.reflectedLightOffset.height,
        ]
      )
    ),
  };

  const translateX = useDerivedValue(() =>
    interpolate(
      depth.value,
      [-INITIAL_DEPTH, INITIAL_DEPTH],
      [-props.offset.width * 0.5, 0]
    )
  );

  const translateY = useDerivedValue(() =>
    interpolate(
      depth.value,
      [-INITIAL_DEPTH, INITIAL_DEPTH],
      [-props.offset.height * 0.5, 0]
    )
  );

  const PressedAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return {
    onPressIn,
    onPressOut,
    depth,
    offset,
    reflectedLightOffset,
    inset,
    blurRadius,
    PressedAnimatedStyle,
  };
}
