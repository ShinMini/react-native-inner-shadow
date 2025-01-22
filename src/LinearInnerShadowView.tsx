import React from 'react';
import { Pressable } from 'react-native';

import {
  DEFAULT_SHADOW_SPACE,
  getBackgroundColor,
  getShadowProperty,
  LinearInnerShadowViewProps,
} from './utils';
import LinearShadowCanvas from './LinearInnerShadowCanvas';

/**
 * LinearShadowView
 * -----------------
 * A specialized component for rendering a view with a
 * linear gradient background and an optional inset shadow.
 * It measures the component's size, then delegates
 * the actual drawing to `LinearShadowCanvas`.
 */
const LinearShadowView: React.FunctionComponent<LinearInnerShadowViewProps> = ({
  // Destructure shadowSpace from props, using a default if none is specified.
  shadowSpace = DEFAULT_SHADOW_SPACE,
  ...props
}) => {
  /**
   * Local state to store the measured width and height of the Pressable container.
   * This ensures we can accurately size the underlying Skia canvas.
   */
  const [boxSize, setBoxSize] = React.useState({ width: 0, height: 0 });

  /**
   * Determine the background color, which may come from props or fallback defaults.
   */
  const backgroundColor = getBackgroundColor(props);

  /**
   * Extract shadow and reflected-light properties
   * (like color, blur, offset) from the provided props.
   */
  const shadowProperties = getShadowProperty(props);

  return (
    <Pressable
      /**
       * onLayout callback captures the size of this component once rendered.
       * We store width and height so the <Canvas> knows its exact dimensions.
       */
      onLayout={({ nativeEvent: { layout: { width, height } } }) =>
        setBoxSize({ width, height })
      }
      {...props}
      style={[
        props.style,
        {
          // The parent background is transparent, since the Skia canvas
          // is responsible for rendering the actual background/gradient.
          backgroundColor: 'transparent',
        },
      ]}
    >
      {/**
       * Only render the <LinearShadowCanvas> once we have non-zero dimensions.
       * This avoids rendering a canvas too early or at incorrect sizes.
       */}
      {boxSize.width === 0 && boxSize.height === 0 ? null : (
        <LinearShadowCanvas
          // Pass all shadow-related props (color, blur, offset, etc.).
          {...props}
          {...shadowProperties}
          // The background color used if needed for fallback or styling effects.
          backgroundColor={backgroundColor}
          // Spacing to ensure shadows don’t get clipped at the rectangle edges.
          shadowSpace={shadowSpace}
          width={boxSize.width}
          height={boxSize.height}
        />
      )}

      {/**
       * Render any nested children in front of the Skia canvas.
       * If your children need to appear under the gradient, consider
       * an alternative layering approach.
       */}
      {props.children}
    </Pressable>
  );
};

export default LinearShadowView;
