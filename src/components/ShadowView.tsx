import {View, Text} from 'react-native';
import React from 'react';
import {getBackgroundColor, getShadowProperty} from '../utils';
import {DEFAULT_SHADOW_SPACE, InnerShadowProps} from '../types';

/**
 * ShadowView
 * -----------
 * A React Native component that renders an inset (or standard) shadow around its children
 * using a Skia-based <Canvas>. The shadow parameters (color, blur, offsets) and background
 * color can be customized via props.
 */
// const ShadowView: React.FunctionComponent<InnerShadowProps> = ({
//   shadowSpace = DEFAULT_SHADOW_SPACE,
//   ...props
// }) => {

// }
