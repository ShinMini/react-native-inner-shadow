# react-native-inner-shadow

A React Native library for creating **inset shadows** and **reflected light** effects with [React Native Skia](https://shopify.github.io/react-native-skia/). Supports both **solid** and **linear gradient** backgrounds for advanced UI designs.

![npm](https://img.shields.io/npm/v/react-native-inner-shadow?style=flat-square)
![license](https://img.shields.io/github/license/ShinMini/react-native-inner-shadow?style=flat-square)
![downloads](https://img.shields.io/npm/dm/react-native-inner-shadow?style=flat-square)

## Preview

  <img src="https://github.com/user-attachments/assets/6f027db0-eb9d-4f6f-a003-a650d0582752.png" alt="thumbnail"  height="300px"/>


<br />
<br />

## Features

- **Inset Shadows**: Achieve the “inset” effect not supported by standard React Native shadows.
- **Reflected Light**: Optional highlight for a more 3D, “raised” or “depressed” effect.
- **Solid Background or Linear Gradient**: Choose between a simple solid fill or a multi-color gradient.
- **Customizable**: Control blur radius, color, offsets, and more.
- **Skia-Powered**: Uses [React Native Skia](https://shopify.github.io/react-native-skia/), enabling cross-platform support (iOS & Android) and high-performance rendering.

---

## Installation

```bash
# Using npm
npm install react-native-inner-shadow

# Using Yarn
yarn add react-native-inner-shadow
```

> Note: You must have React Native Skia properly installed and configured in your React Native project.

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
