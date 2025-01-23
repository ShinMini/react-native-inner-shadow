import React, { useMemo } from 'react';
import { Pressable } from 'react-native';

import ShadowCanvas from './ShadowCanvas';
import { getBackgroundColor, getShadowProperty } from '../utils';
import LinearShadowCanvas from './LinearShadowCanvas';
import type { InnerShadowProps, LinearInnerShadowProps } from '../types';

const _ShadowView: React.FunctionComponent<
  InnerShadowProps & LinearInnerShadowProps
> = ({ ...props }) => {
  const [boxSize, setBoxSize] = React.useState({ width: 0, height: 0 });

  // Determine the final background color (pulling from `props.style` or a default).
  const backgroundColor = getBackgroundColor(props);

  // Compute final shadow and reflected-light properties from the provided props.
  const shadowProperties = getShadowProperty(props);

  const isLinear = useMemo(() => {
    // @ts-ignore
    return props.colors[0] === -Math.PI ? false : true;
  }, [props.colors]);

  return (
    <Pressable
      /**
       * onLayout captures the size of this component once it’s rendered.
       * We store these dimensions in state so we can pass them to the <Canvas>.
       */
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => setBoxSize({ width, height })}
      {...props}
      style={[
        props.style,
        {
          backgroundColor: 'transparent',
        },
      ]}
    >
      {/**
       * We only render the <Canvas> if the measured width and height are non-zero.
       * This prevents rendering issues if the layout hasn't been established yet.
       */}
      {boxSize.width === 0 && boxSize.height === 0 ? null : isLinear ? (
        <LinearShadowCanvas
          {...props}
          {...shadowProperties}
          backgroundColor={backgroundColor}
          width={boxSize.width}
          height={boxSize.height}
        />
      ) : (
        <ShadowCanvas
          {...props}
          {...shadowProperties}
          backgroundColor={backgroundColor}
          width={boxSize.width}
          height={boxSize.height}
        />
      )}
      {/**
       * Render any nested children above the Skia canvas.
       * Typically, the shadow is a background/overlay, so children
       * appear in front of the shadow effect.
       */}
      {props.children}
    </Pressable>
  );
};

/**
 * ShadowView
 * -----------
 * A React Native component that renders an inset (or standard) shadow around its children
 * using a Skia-based <Canvas>. The shadow parameters (color, blur, offsets) and background
 * color can be customized via props.
 */
const ShadowView: React.FunctionComponent<InnerShadowProps> = ({
  ...props
}) => {
  const colors = [-Math.PI];
  return <_ShadowView {...props} colors={colors} />;
};

/**
 * LinearShadowView
 * -----------------
 * A specialized component for rendering a view with a
 * linear gradient background and an optional inset shadow.
 * It measures the component's size, then delegates
 * the actual drawing to `LinearShadowCanvas`.
 */
const LinearShadowView: React.FunctionComponent<LinearInnerShadowProps> = ({
  ...props
}) => {
  return <_ShadowView {...props} />;
};

export { ShadowView, LinearShadowView };
