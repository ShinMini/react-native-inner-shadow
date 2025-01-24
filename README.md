# react-native-inner-shadow

A React Native library for creating **inset shadows** and **reflected light** effects with [React Native Skia](https://shopify.github.io/react-native-skia/). Supports both **solid** and **linear gradient** backgrounds for advanced UI designs.

![npm](https://img.shields.io/npm/v/react-native-inner-shadow?style=flat-square)
![license](https://img.shields.io/github/license/ShinMini/react-native-inner-shadow?style=flat-square)
![downloads](https://img.shields.io/npm/dm/react-native-inner-shadow?style=flat-square)

## Preview

  <img width="366" alt="image" src="https://github.com/user-attachments/assets/c588c061-d2c3-4d90-85ed-c71689b2a8cf"  alt="thumbnail 1" />
  <img width="198" alt="image" src="https://github.com/user-attachments/assets/8ca036e2-6fd9-4551-9a61-12b96eba8130" alt="thumbnail 2" />
  <img width="259" alt="image" src="https://github.com/user-attachments/assets/b01da8d7-eb45-4eee-a0a9-8ce57dbf37b9" alt="thumbnail 3" />

<br />
<br />

## Features

- **Inset Shadows**: Achieve the “inset” effect that is not supported by standard React Native shadows.
- **Reflected Light**: Optional highlight for a more 3D, “raised” or “depressed” effect.
- **Solid Background or Linear Gradient**: Choose between a simple solid fill or a multi-color gradient.
- **Customizable**: Control blur radius, color, offsets, and more.
- **Skia-Powered**: Uses [React Native Skia](https://shopify.github.io/react-native-skia/), enabling cross-platform support (iOS & Android) and high-performance rendering.

---

## Installation

```bash
# Using npm
npm install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# Using Yarn
yarn add react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

```

> Note: You must have React Native **Skia** & **reanimated** properly installed and configured in your React Native project.
> For more information, refer to the [official documentation](https://shopify.github.io/react-native-skia/).
> > 반드시 React Native **Skia**, **reanimated**가 올바르게 설치되어 있고 프로젝트에 구성되어 있어야 합니다!

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

# API Specification

This library provides two primary components for creating **inset shadows** or **gradient-based inset shadows** in React Native using [React Native Skia](https://shopify.github.io/react-native-skia/). Additionally, several default constants are exported for convenience.

## Components

### 1. `InnerShadowView`

**Props**: Inherits all properties from [`InnerShadowProps`](#innershadowprops-type) and [`PressableProps`](https://reactnative.dev/docs/pressable).

Use `InnerShadowView` when you need a **solid background** with an inset or outer shadow, optionally including a reflected light (highlight) effect.

### 2. `LinearShadowView`

**Props**: Inherits all properties from [`LinearInnerShadowProps`](#linearinnershadowprops-type).

Use `LinearShadowView` when you need a **linear gradient background** in conjunction with an inset or outer shadow and (optionally) a reflected light effect.

---

## Types

### `InnerShadowProps` Type

<details open>
  <summary>Click to expand</summary>

```ts
export type InnerShadowProps = {
  /**
   * Content nested within the shadowed box.
   */
  children?: ReactNode;

  /**
   * Whether to render the shadow as inset (inside the component).
   * @default false
   */
  inset?: boolean;

  /**
   * Primary shadow color.
   * @default '#2F2F2FBC' (dark gray with slight transparency)
   */
  shadowColor?: string;

  /**
   * How far the shadow is shifted horizontally and vertically.
   * @example { width: 2, height: 2 }
   * @default { width: 2, height: 2 }
   */
  shadowOffset?: { width: number; height: number };

  /**
   * Blur radius for the main shadow. Higher values => softer/larger shadow.
   *
   * - If `inset` is false (outer shadow), `shadowBlur` conceptually substitutes standard
   *   React Native’s `shadowOpacity` (range 0–1).
   * - Suggested range: 0–20
   * @default 3
   */
  shadowBlur?: number;

  /**
   * Enables a highlight (reflected light) on the opposite side of the shadow.
   * - By default, it's `true` if `inset` is `true`, otherwise disabled.
   */
  isReflectedLightEnabled?: boolean;

  /**
   * Color of the reflected light highlight.
   * @default '#EEE9E92D' (a semi-transparent white)
   */
  reflectedLightColor?: string;

  /**
   * Offset for the reflected light highlight. Typically set to the negative
   * of the main shadow offset for an opposite-corner effect.
   * @default { width: -2, height: -2 }
   */
  reflectedLightOffset?: { width: number; height: number };

  /**
   * Blur radius for the reflected light highlight.
   * - Suggested range: 0–20
   * @default 3
   */
  reflectedLightBlur?: number;

  /**
   * Explicitly set width/height for better performance or precise sizing.
   */
  width?: number;
  height?: number;

  /**
   * Background color for the shadowed component.
   * @default '#FFFFFF' unless overridden by style or this prop.
   */
  backgroundColor?: string;

  /**
   * Standard React Native `ViewStyle`. Can include `borderRadius`, etc.
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
   * The start direction of the linear gradient.
   * @default 'top'
   */
  from?: LINEAR_DIRECTION;

  /**
   * The end direction of the linear gradient.
   * @default 'bottom'
   */
  to?: LINEAR_DIRECTION;

  /**
   * An array of colors for the linear gradient. Typically at least two,
   * but more can create smoother transitions.
   */
  colors: AnimatedProp<Color[]>;

} & InnerShadowProps & PressableProps;
```

</details>

Use `from` and `to` to define the gradient direction (e.g., `top` → `bottom` or `left` → `right`). The `colors` prop is an [AnimatedProp](https://shopify.github.io/react-native-skia/docs/api/animated-props) of color arrays supported by Skia.

---

## `ShadowPressable`

`ShadowPressable` is a specialized component that provides a **“press in, press out”** shadow animation, creating a realistic push-button feel. When the user presses (touches down), the shadow inverts (becomes an inset shadow), and on release, it returns to its original “raised” state. This leverages [React Native Skia](https://shopify.github.io/react-native-skia/) for drawing shadows and [Reanimated](https://docs.swmansion.com/react-native-reanimated/) for smooth transitions.

### Example Usage

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
      dumping={0.8}
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

### Props

`ShadowPressableProps` extends typical `PressableProps` plus the following:

| Prop                      | Type       | Default                      | Description                                                                            |
| ------------------------- | ---------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| **`width`**              | `number`   | `0`                          | Width of the component (optional if style provides width).                             |
| **`height`**             | `number`   | `0`                          | Height of the component (optional if style provides height).                           |
| **`initialDepth`**       | `number`   | `3`                          | Controls how “high” or “deep” the button appears in normal (unpressed) state.          |
| **`shadowSpace`**        | `number`   | `9`                          | Padding around the box inside the Skia `<Canvas>` to avoid clipping larger shadows.    |
| **`shadowBlur`**         | `number`   | `20`                         | Base blur radius for the shadow. Adjust for softer/harder edges.                       |
| **`shadowColor`**        | `string`   | `'#2F2F2FBC'` (dark gray)    | The color of the main shadow.                                                          |
| **`reflectedLightColor`**| `string`   | `'#EEE9E92D'`                | The color of the optional reflected-light highlight on the opposite side.             |
| **`duration`**           | `number`   | `200`                        | Animation duration (milliseconds) for the press in/out transitions.                    |
| **`dumping`**            | `number`   | `0.8`                        | Scales how far the shadow travels when pressed in.                                     |
| **`isReflectedLightEnabled`** | `boolean` | `true`                   | Whether to render a secondary “reflected light” highlight.                             |

### How it Works

- The component listens for `onPressIn` and `onPressOut` events:
  - **`onPressIn`**: Animates the shadow to an inset state (negative depth) using Reanimated’s `withTiming`.
  - **`onPressOut`**: Returns the shadow to its original “raised” state.
- Shadows and highlights are drawn on a Skia `<Canvas>`, allowing smooth, hardware-accelerated effects on both iOS and Android.

### Tips & Notes

1. **Clipping**
   - If you use a large `initialDepth`, ensure `shadowSpace` is big enough to prevent the shadow from getting cropped by the canvas boundaries.

2. **Customization**
   - You can adjust `shadowBlur` or color to change the shadow’s softness and tone.
   - `dumping` (sometimes referred to as “damping”) determines how far the shadow insets when pressed.

3. **Performance**
   - Like other Skia-based shadows, each `ShadowPressable` uses a `<Canvas>`. This is typically performant enough for a few buttons, but test carefully if you use many such components in a list or dynamic layout.

By combining Skia and Reanimated, `ShadowPressable` makes it simple to create a visually engaging, tactile button effect that simulates pressing into or popping out of the surface. Enjoy customizing it for your design needs!

---

## Constants

The library also exports a few useful defaults:

| Constant                          | Description                                                            |
| --------------------------------- | ---------------------------------------------------------------------- |
| **`DEFAULT_SHADOW_OFFSET_SCALE`** | Scale factor for default shadow offsets. Default `2`.                  |
| **`DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE`** | Scale factor for reflected light offsets. Default `2`.               |
| **`DEFAULT_BACKGROUND_COLOR`**    | Fallback color if no custom background is specified (`#FFFFFF`).       |
| **`DEFAULT_REFLECTED_LIGHT_COLOR`** | Fallback color for the highlight (`#EEE9E92D`).                        |
| **`DEFAULT_SHADOW_COLOR`**        | Fallback main shadow color (`#2F2F2FBC`).                              |
| **`DEFAULT_SHADOW_BLUR`**         | Fallback blur radius for the main shadow Default `3`.                        |
| **`DEFAULT_REFLECTED_LIGHT_BLUR`** | Fallback blur radius for the reflected light Default `3`.                    |

---

## Notes & Tips

1. **Reflected Light**
   - When `inset` is `true`, the library automatically enables `isReflectedLightEnabled` unless you explicitly set it to `false`.
   - Adjust `reflectedLightColor` and `reflectedLightOffset` to get subtle or pronounced highlights.

2. **Performance**
   - Each `InnerShadowView` or `LinearShadowView` uses a Skia `<Canvas>` under the hood. Consider memoizing components or reducing re-renders if you have many shadows in a list.

3. **Borders and Rounding**
   - If you use `borderRadius`, ensure it’s uniform (a single numeric value). Handling distinct corner radii (e.g. `borderTopLeftRadius`) currently requires additional logic in Skia.

---
