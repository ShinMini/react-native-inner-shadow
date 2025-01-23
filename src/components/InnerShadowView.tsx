import React from 'react';
import {Pressable} from 'react-native';

import ShadowCanvas from './InnerShadowCanvas';
import {getBackgroundColor, getShadowProperty} from '../utils';
import {DEFAULT_SHADOW_SPACE, InnerShadowProps} from '../types';

/**
 * ShadowView
 * -----------
 * A React Native component that renders an inset (or standard) shadow around its children
 * using a Skia-based <Canvas>. The shadow parameters (color, blur, offsets) and background
 * color can be customized via props.
 */
const ShadowView: React.FunctionComponent<InnerShadowProps> = ({
  shadowSpace = DEFAULT_SHADOW_SPACE,
  ...props
}) => {
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
      {...props}
      style={[
        props.style,
        {
          backgroundColor: 'transparent',
        },
      ]}>
      {/**
       * We only render the <Canvas> if the measured width and height are non-zero.
       * This prevents rendering issues if the layout hasn't been established yet.
       */}
      {boxSize.width === 0 && boxSize.height === 0 ? null : (
        <ShadowCanvas
          {...props}
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
