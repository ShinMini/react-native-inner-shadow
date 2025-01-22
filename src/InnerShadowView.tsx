import React from 'react';
import {Pressable} from 'react-native';

import ShadowCanvas from './InnerShadowCanvas';
import {
  DEFAULT_SHADOW_SPACE,
  getBackgroundColor,
  getShadowProperty,
  InnerShadowProps,
} from './utils';

/**
 * ShadowView
 * -----------
 * A React Native component that renders an inset (or standard) shadow around its children
 * using a Skia-based <Canvas>. The shadow parameters (color, blur, offsets) and background
 * color can be customized via props.
 */
const ShadowView: React.FunctionComponent<InnerShadowProps> = ({
  // Destructuring shadowSpace from props with a default value.
  // The rest of the props are collected into `props`.
  shadowSpace = DEFAULT_SHADOW_SPACE,
  ...props
}) => {
  // Local state to store the measured width and height of the Pressable container.
  const [boxSize, setBoxSize] = React.useState({width: 0, height: 0});

  // Determine the final background color (pulling from `props.style` or a default).
  const backgroundColor = getBackgroundColor(props);

  // Compute final shadow and reflected-light properties from the provided props.
  const shadowProperties = getShadowProperty(props);

  return (
    <Pressable
      /**
       * onLayout captures the size of this component once it’s rendered.
       * We store these dimensions in state so we can pass them to the <Canvas>.
       */
      onLayout={({
        nativeEvent: {
          layout: {width, height},
        },
      }) => setBoxSize({width, height})}
      {...props} // Spread remaining props (like onPress, accessible props, etc.).
      style={[
        props.style,
        {
          // We set the parent’s background to transparent because
          // the Skia canvas will handle the actual background fill.
          backgroundColor: 'transparent',
        },
      ]}>
      {/**
       * We only render the <Canvas> if the measured width and height are non-zero.
       * This prevents rendering issues if the layout hasn't been established yet.
       */}
      {boxSize.width === 0 && boxSize.height === 0 ? null : (
        <ShadowCanvas
          // Forward the main props...
          {...props}
          // ...plus the computed shadow properties
          {...shadowProperties}
          backgroundColor={backgroundColor}
          shadowSpace={shadowSpace}
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

export default ShadowView;
