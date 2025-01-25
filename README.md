# react-native-inner-shadow

A React Native library for creating **inset shadows** and **reflected light** effects with [React Native Skia](https://shopify.github.io/react-native-skia/).
Supports both **solid** and **linear gradient** backgrounds for advanced UI designs.

![npm](https://img.shields.io/npm/v/react-native-inner-shadow?style=flat-square)
![license](https://img.shields.io/github/license/ShinMini/react-native-inner-shadow?style=flat-square)
![downloads](https://img.shields.io/npm/dm/react-native-inner-shadow?style=flat-square)

---

## Table of Contents

- [react-native-inner-shadow](#react-native-inner-shadow)
  - [Table of Contents](#table-of-contents)
  - [Preview](#preview)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage Examples](#usage-examples)
    - [1. Simple Inset Shadow](#1-simple-inset-shadow)
    - [2. Linear Gradient with Inset Shadow](#2-linear-gradient-with-inset-shadow)
  - [ShadowPressable](#shadowpressable)
    - [Example](#example)
    - [ShadowPressable Props](#shadowpressable-props)
  - [API Specification](#api-specification)
    - [Components](#components)
    - [`InnerShadowProps` Type](#innershadowprops-type)
    - [`LinearInnerShadowProps` Type](#linearinnershadowprops-type)
  - [Constants](#constants)
  - [Notes \& Tips](#notes--tips)

---

## Preview

<img width="366" alt="thumbnail 1" src="https://github.com/user-attachments/assets/c588c061-d2c3-4d90-85ed-c71689b2a8cf" />

![shadow button use case](https://github.com/user-attachments/assets/37de0c80-517e-4cb5-96d0-e7346bd2c15c)

---

## Features

- **Inset Shadows**: Achieve the “inset” effect that is not supported by standard React Native shadows.
- **Reflected Light**: Optional highlight for a more 3D “raised” or “depressed” effect.
- **Solid Background or Linear Gradient**: Choose between a simple solid fill or a multi-color gradient.
- **Customizable**: Control blur radius, color, offsets, and more.
- **Skia-Powered**: Uses [React Native Skia](https://shopify.github.io/react-native-skia/) for cross-platform, high-performance rendering.

---

## Installation

```bash
# Using npm
npm install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# Using Yarn
yarn add react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

> **Note**: You must have React Native **Skia** and **Reanimated** properly installed and configured in your React Native project. For more information, refer to the [official documentation](https://shopify.github.io/react-native-skia/).

---

## Usage Examples

### 1. Simple Inset Shadow

```tsx
import React from 'react';
import { View } from 'react-native';
import { InnerShadowView } from 'react-native-inner-shadow';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <InnerShadowView
        style={{ width: 120, height: 120, borderRadius: 12 }}
        inset
        isReflectedLightEnabled={false}
        shadowColor="#00000066"
        shadowOffset={{ width: 2, height: 2 }}
        shadowBlur={5}
        backgroundColor="#ffffff"
      >
        {/* Child content goes here */}
      </InnerShadowView>
    </View>
  );
}
```

### 2. Linear Gradient with Inset Shadow

```tsx
import React from 'react';
import { View } from 'react-native';
import { LinearShadowView } from 'react-native-inner-shadow';

export default function GradientExample() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearShadowView
        style={{ width: 150, height: 150, borderRadius: 16 }}
        from="top"
        to="bottom"
        colors={['#FF7A7A', '#FFE08C']}
        shadowColor="#22222299"
        shadowOffset={{ width: 4, height: 4 }}
        shadowBlur={8}
        inset
      >
        {/* Child content goes here */}
      </LinearShadowView>
    </View>
  );
}
```

---

## ShadowPressable

`ShadowPressable` is a specialized component that provides a **“press in, press out”** shadow animation, creating a realistic push-button feel. When the user presses (touches down), the shadow inverts (becomes an inset shadow), and on release, it returns to its original “raised” state. This leverages [React Native Skia](https://shopify.github.io/react-native-skia/) for drawing shadows and [Reanimated](https://docs.swmansion.com/react-native-reanimated/) for smooth transitions.

### Example

```tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ShadowPressable } from 'react-native-inner-shadow';

export default function App() {
  return (
    <ShadowPressable
      style={styles.pressable}
      initialDepth={3}
      shadowBlur={20}
      duration={200}
      damping={0.8}
    >
      <Text style={styles.label}>Press Me</Text>
    </ShadowPressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
});
```

### ShadowPressable Props

| Prop                           | Type       | Default             | Description                                                                                |
| ------------------------------ | ---------- | ------------------- | ------------------------------------------------------------------------------------------ |
| **`width`**                    | `number`   | `0`                 | Width of the component (optional if style provides width).                                 |
| **`height`**                   | `number`   | `0`                 | Height of the component (optional if style provides height).                               |
| **`initialDepth`**             | `number`   | `3`                 | Controls how “high” or “deep” the button appears in normal (unpressed) state.              |
| **`shadowSpace`**              | `number`   | `9`                 | Padding around the box inside the Skia `<Canvas>` to avoid clipping larger shadows.        |
| **`shadowBlur`**               | `number`   | `20`                | Base blur radius for the shadow. Adjust for softer/harder edges.                           |
| **`shadowColor`**              | `string`   | `'#2F2F2FBC'`       | The color of the main shadow.                                                              |
| **`reflectedLightColor`**      | `string`   | `'#EEE9E92D'`       | The color of the optional reflected-light highlight on the opposite side.                 |
| **`duration`**                 | `number`   | `200`               | Animation duration (milliseconds) for the press in/out transitions.                        |
| **`damping`**                  | `number`   | `0.8`               | Scales how far the shadow travels when pressed in.            |
| **`isReflectedLightEnabled`**  | `boolean`  | `true`             | Whether to render a secondary “reflected light” highlight.                                 |

- **How it Works**
  - The component listens for `onPressIn` and `onPressOut` events:
    - **`onPressIn`**: Animates the shadow to an inset state (negative depth) using Reanimated’s `withTiming`.
    - **`onPressOut`**: Returns the shadow to its original “raised” state.
  - Shadows and highlights are drawn on a Skia `<Canvas>`, allowing smooth, hardware-accelerated effects on both iOS and Android.

- **Tips & Notes**
  1. **Clipping**: If you use a large `initialDepth`, ensure `shadowSpace` is big enough to prevent the shadow from getting cropped.
  2. **Customization**: Adjust `shadowBlur` or color to change the shadow’s softness.
  3. **Performance**: Typically fine for a few buttons, but test carefully if using many such components in a list.

---

## API Specification

This library provides two main components for inset shadows: **`InnerShadowView`** (solid background) and **`LinearShadowView`** (gradient background). Both rely on [React Native Skia](https://shopify.github.io/react-native-skia/) for rendering.

### Components

1. **`InnerShadowView`**
   Inherits from [`InnerShadowProps`](#innershadowprops-type) and [`PressableProps`](https://reactnative.dev/docs/pressable).
   Use it for a **solid** background with an inset or outer shadow, optionally including a reflected light (highlight) effect.

2. **`LinearShadowView`**
   Inherits from [`LinearInnerShadowProps`](#linearinnershadowprops-type).
   Use it for a **linear gradient** background, along with an inset or outer shadow and optional reflected light.

---

### `InnerShadowProps` Type

<details open>
  <summary>Click to expand</summary>

```ts
export type InnerShadowProps = {
  children?: ReactNode;
  /**
   * Whether to render the shadow as inset (inside the component).
   * @default false
   */
  inset?: boolean;

  /**
   * Primary shadow color.
   * @default '#2F2F2FBC'
   */
  shadowColor?: string;

  /**
   * Horizontal/vertical offset for the main shadow.
   * @default { width: 2, height: 2 }
   */
  shadowOffset?: { width: number; height: number };

  /**
   * Blur radius for the main shadow.
   * Suggested range: 0–20
   * @default 3
   */
  shadowBlur?: number;

  /**
   * Enables a highlight on the opposite side of the shadow.
   * Defaults to `true` if `inset` is `true`.
   */
  isReflectedLightEnabled?: boolean;

  /**
   * Color of the reflected light highlight.
   * @default '#EEE9E92D'
   */
  reflectedLightColor?: string;

  /**
   * Offset for the reflected light highlight.
   * @default { width: -2, height: -2 }
   */
  reflectedLightOffset?: { width: number; height: number };

  /**
   * Blur radius for the reflected light highlight.
   * @default 3
   */
  reflectedLightBlur?: number;

  /**
   * Manually set width and height if needed.
   */
  width?: number;
  height?: number;

  /**
   * Background color of the shadowed element.
   * @default '#FFFFFF'
   */
  backgroundColor?: string;

  /**
   * React Native style object.
   */
  style?: ViewStyle;
} & PressableProps;
```

</details>

---

### `LinearInnerShadowProps` Type

<details>
  <summary>Click to expand</summary>

```ts
export type LINEAR_DIRECTION = 'top' | 'bottom' | 'left' | 'right';

export type LinearInnerShadowProps = {
  /**
   * Start direction of the linear gradient.
   * @default 'top'
   */
  from?: LINEAR_DIRECTION;

  /**
   * End direction of the linear gradient.
   * @default 'bottom'
   */
  to?: LINEAR_DIRECTION;

  /**
   * Array of colors for the gradient.
   */
  colors: AnimatedProp<Color[]>;
} & InnerShadowProps & PressableProps;
```

</details>

Use `from` and `to` to define the gradient direction (e.g., `top → bottom`). The `colors` prop is an [AnimatedProp](https://shopify.github.io/react-native-skia/docs/api/animated-props) of color arrays supported by Skia.

---

## Constants

This library also exports some default constants:

| Constant                                    | Description                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| **`DEFAULT_SHADOW_OFFSET_SCALE`**           | Scale factor for default shadow offsets. Default is `2`.                  |
| **`DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE`**  | Scale factor for reflected light offsets. Default is `2`.                 |
| **`DEFAULT_BACKGROUND_COLOR`**              | Fallback background color (`#FFFFFF`).                                    |
| **`DEFAULT_REFLECTED_LIGHT_COLOR`**         | Fallback highlight color (`#EEE9E92D`).                                   |
| **`DEFAULT_SHADOW_COLOR`**                  | Fallback main shadow color (`#2F2F2FBC`).                                 |
| **`DEFAULT_SHADOW_BLUR`**                   | Fallback blur radius for the main shadow. Default is `3`.                 |
| **`DEFAULT_REFLECTED_LIGHT_BLUR`**          | Fallback blur radius for the reflected light. Default is `3`.             |

---

## Notes & Tips

1. **Reflected Light**
   - When `inset` is `true`, `isReflectedLightEnabled` defaults to `true`. Tweak `reflectedLightColor` and `reflectedLightOffset` for different highlight intensities.

2. **Performance**
   - Each component uses a `<Canvas>` from Skia. If you have many of these in a list, consider memoization or limiting re-renders.

3. **Border Radii**
   - Currently, a single numeric `borderRadius` is fully supported. Handling multiple corner radii would require a more advanced path setup in Skia.

---

Enjoy creating beautifully styled inset shadows and interactive pressable shadows with **react-native-inner-shadow**! If you have questions or feature requests, feel free to open an issue or submit a pull request.
