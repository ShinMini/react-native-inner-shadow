English | [한국어](https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/README.KR.md)

# react-native-inner-shadow

A React Native library for creating **inset shadows** and **reflected light** effects with [React Native Skia](https://shopify.github.io/react-native-skia/).
Supports both **solid** and **linear gradient** backgrounds for advanced UI designs, plus interactive pressable or toggle states using [Reanimated](https://docs.swmansion.com/react-native-reanimated/).

![license](https://img.shields.io/github/license/ShinMini/react-native-inner-shadow?style=flat-square)
[![npm](https://img.shields.io/npm/v/react-native-inner-shadow.svg?style=flat-square)](https://www.npmjs.com/package/react-native-inner-shadow)

![downloads](https://img.shields.io/npm/dm/react-native-inner-shadow?style=flat-square)
![downloads](https://img.shields.io/npm/dw/react-native-inner-shadow?style=flat-square)

---

## Installation

```bash
# Using npm
npm install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# Or using Yarn
yarn add react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

If you’re using **Expo**, you can run:

```bash
npx expo install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

> **Important**
> You must have React Native **Skia** and **Reanimated** properly installed and configured in your React Native project.
> See the [Skia documentation](https://shopify.github.io/react-native-skia/docs/getting-started/installation) and the [Reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) for details.

Add react-native-reanimated/plugin plugin to your babel.config.js.

```babel.config.js
  module.exports = {
    presets: [
      ... // don't add it here :)
    ],
    plugins: [
      ...
      'react-native-reanimated/plugin',
    ],
  };
```

Don't forget to run after installing the dependencies:

```bash

cd ios && bundle exec pod install && cd ..

```

---

## Table of Contents

- [react-native-inner-shadow](#react-native-inner-shadow)
  - [Installation](#installation)
  - [Table of Contents](#table-of-contents)
  - [Preview](#preview)
  - [Features](#features)
  - [Usage Examples](#usage-examples)
    - [1. Simple Inset Shadow](#1-simple-inset-shadow)
    - [2. Linear Gradient with Inset Shadow](#2-linear-gradient-with-inset-shadow)
  - [ShadowPressable](#shadowpressable)
    - [Example](#example)
    - [ShadowPressable Props](#shadowpressable-props)
  - [ShadowToggle](#shadowtoggle)
    - [When to Use](#when-to-use)
    - [Simple Example](#simple-example)
    - [Key Props](#key-props)
    - [Behavior](#behavior)
    - [Notes](#notes)
  - [API Specification](#api-specification)
    - [Components](#components)
    - [`InnerShadowProps` Type](#innershadowprops-type)
    - [`LinearInnerShadowProps` Type](#linearinnershadowprops-type)
  - [Constants](#constants)
  - [Notes \& Tips](#notes--tips)

---

## Preview

<img width="45%" max-width="450px" alt="inner shadow & linear shadow sample" src="https://github.com/user-attachments/assets/c588c061-d2c3-4d90-85ed-c71689b2a8cf" />

<img width="45%" max-width="450px" alt="inner shadow pressable & toggle sample gif" src="https://github.com/user-attachments/assets/2a59b1a8-65df-487b-aabe-1f0a94d5aa10" />

---

## Features

- **Inset Shadows**: Achieve the “inset” effect that isn’t natively supported by React Native.
- **Reflected Light**: Optional highlight (on the opposite side of the main shadow) for a more 3D, “depressed” look.
- **Solid or Linear Gradient**: Choose between a plain background color (`InnerShadowView`) or multi-color gradient (`LinearShadowView`).
- **Pressable & Toggle Support**: Interactive variants (`ShadowPressable`, `ShadowToggle`) to animate shadows with [Reanimated](https://docs.swmansion.com/react-native-reanimated/).
- **High Performance**: Powered by [React Native Skia](https://shopify.github.io/react-native-skia/) for smooth cross-platform rendering.

---

## Usage Examples

### 1. Simple Inset Shadow

```tsx
import React from 'react';
import {Text, View} from 'react-native';

import {ShadowView} from 'react-native-inner-shadow';

export default function App() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ShadowView
        style={{
          width: 120,
          height: 120,
          borderRadius: 12,
          backgroundColor: '#f0f0f0',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        inset
        shadowColor="#00000066"
        shadowOffset={{width: 2, height: 2}}
        shadowBlur={5}
        isReflectedLightEnabled={false}>
        <Text style={{textAlign: 'center', color: '#2f2f2f', fontSize: 14}}>
          inner-shadow
        </Text>
      </ShadowView>
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
        {/* Your content */}
      </LinearShadowView>
    </View>
  );
}
```

---

## ShadowPressable

`ShadowPressable` is a specialized component that provides a **“press in, press out”** shadow animation for a physically realistic button effect. By default, pressing it inverts the shadow (making it look “depressed”), then returns to the original raised state on release. This is powered by **Skia** (for drawing) and **Reanimated** (for animations).

### Example

```tsx
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ShadowPressable} from 'react-native-inner-shadow';

export default function App() {
  return (
    <View style={styles.container}>
      <ShadowPressable
        style={styles.button}
        initialDepth={2}
        shadowBlur={7}
        duration={200}
        damping={1.2}>
        <Text style={styles.label}>Press Me</Text>
      </ShadowPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 63,
    backgroundColor: '#E5A9A9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F4E4BA',
  },
});
```

### ShadowPressable Props

| Prop                          | Type      | Default       | Description                                                                                  |
| ----------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------- |
| **`width`**                   | `number`  | `0`           | Manual width (optional; if style has a width, that’s used).                                  |
| **`height`**                  | `number`  | `0`           | Manual height (optional; if style has a height, that’s used).                                |
| **`initialDepth`**            | `number`  | `3`           | Sets how “raised” the shadow is initially.                                                   |
| **`shadowSpace`**             | `number`  | `9`           | Extra space inside the `<Canvas>` to prevent clipping if you have a big blur or offset.      |
| **`shadowBlur`**              | `number`  | `20`          | Blur radius for the main shadow. Adjust to taste for softer/harder edges.                    |
| **`shadowColor`**             | `string`  | `'#2F2F2FBC'` | Color of the main shadow (can be semi-transparent).                                          |
| **`reflectedLightColor`**     | `string`  | `'#EEE9E92D'` | The color for a highlight on the opposite side of the main shadow.                           |
| **`duration`**                | `number`  | `200`         | Animation duration (ms) for the press in/out transitions.                                    |
| **`damping`**                 | `number`  | `0.8`         | Scales how far the shadow insets when pressed. (Sometimes spelled “damping.”)                |
| **`isReflectedLightEnabled`** | `boolean` | `true`        | Whether to draw a second “reflected light” shadow.                                           |

**Behavior**

- **Press In**: Moves the shadow to an inset state (`depth < 0`).
- **Release**: Returns shadow to the original “raised” position.
- **Clipping**: If you do large offsets or big blurs, consider increasing `shadowSpace`.

---

## ShadowToggle

`ShadowToggle` is a **controlled** variant of `ShadowPressable` (or a similar logic) that toggles based on an external `isActive` prop. If `isActive` is `true`, it insets the shadow; if `false`, it shows it raised. You can also interpolate background colors if you pass an `activeColor`.

### When to Use

- You need a “toggle” or “switch” style button, where the pressed state is persistent, controlled by external logic.
- You want to highlight the toggle is “on” or “off” visually with a shadow inset and possibly a different background color.

### Simple Example

```tsx
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ShadowToggle} from 'react-native-inner-shadow';

export default function ToggleExample() {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <ShadowToggle
        initialDepth={3}
        style={styles.toggle}
        isActive={isActive}
        activeColor="#FFD700"
        onPress={() => setIsActive(prev => !prev)}>
        <Text
          style={[
            styles.label,
            {
              color: isActive ? '#515050' : '#eeebeb',
            },
          ]}>
          {isActive ? 'ON' : 'OFF'}
        </Text>
      </ShadowToggle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggle: {
    width: '30%',
    aspectRatio: 1.7,
    borderRadius: 12,
    backgroundColor: '#06d6a0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
});
```

### Key Props

| Prop                      | Type      | Default | Description                                                                                 |
| ------------------------- | --------- | ------- | ------------------------------------------------------------------------------------------- |
| **`isActive`**            | `boolean` | `false` | Whether the shadow is inset (active) or raised (inactive).                                 |
| **`activeColor`**         | `string`  | `null`  | If provided, transitions the background color when `isActive` is `true`.                   |
| **`initialDepth`**        | `number`  | `3`     | How “deep” the raised state is. Inset goes negative, so `isActive` toggles shadow inward.   |
| **`damping`**             | `number`  | `0.8`   | Controls how far the shadow insets if `isActive` is `true`.                                 |
| **`shadowBlur`**          | `number`  | `10`    | Blur radius for the main shadow.                                                           |
| **`shadowSpace`**         | `number`  | `6`     | Extra canvas space to avoid clipping.                                                      |
| **`duration`**            | `number`  | `200`   | Animation duration (ms) for toggling from inactive→active or vice versa.                    |
| **`isReflectedLightEnabled`** | `boolean` | `true` | Whether to draw the highlight reflection.                                                 |

### Behavior

- **`isActive` → Inset**: The shadow shifts inward (negative depth).
- **`!isActive` → Raised**: The shadow returns to a normal outer/neutral depth.
- **Optional Color**: Switch to `activeColor` if `isActive` is `true`; fallback to normal `backgroundColor` otherwise.

### Notes

- **Controlled vs. Uncontrolled**: Typically, you store `isActive` in your state (like `useState`), then pass it down. You can also define an internal state if you want a fully self-contained toggle.
- **Performance**: If you have many toggles, test carefully on lower-end devices, though Skia + Reanimated is usually quite efficient.

---

## API Specification

This library offers multiple ways to create inset or togglable shadows:

### Components

1. **`ShadowView`**
   - A simpler, “solid background” approach. Inherits from `ShadowViewProps`.
2. **`LinearShadowView`**
   - Extends `InnerShadowProps` with gradient logic (`from`, `to`, `colors`).
3. **`ShadowPressable`**
   - Pressable version with an animated “press in” effect.
4. **`ShadowToggle`**
   - Controlled version toggling an inset shadow based on `isActive`.

---

### `InnerShadowProps` Type

<details open>
  <summary>Click to expand</summary>

```ts
export interface InnerShadowProps extends ViewProps {
  children?: React.ReactNode;
  inset?: boolean;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowBlur?: number;
  isReflectedLightEnabled?: boolean;
  reflectedLightColor?: string;
  reflectedLightOffset?: { width: number; height: number };
  reflectedLightBlur?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  style?: ViewStyle;
}
```

- Defines basic shadow properties, optional reflected light, and optional sizing.
- `inset`: Whether the shadow is drawn inside (`true`) or outside (`false`).
- `shadowBlur`: Typically 0–20 for a soft spread.
- `style`: Accepts a typical RN `ViewStyle`; you can specify `borderRadius` for rounded corners.

</details>

---

### `LinearInnerShadowProps` Type

<details>
  <summary>Click to expand</summary>

```ts
export type LINEAR_DIRECTION = 'top' | 'bottom' | 'left' | 'right';

export interface LinearInnerShadowProps extends InnerShadowProps {
  from?: LINEAR_DIRECTION;
  to?: LINEAR_DIRECTION;
  colors: AnimatedProp<Color[]>;
}
```

- Inherits all from `InnerShadowProps` plus gradient fields.
- `from` and `to` define the gradient’s start/end direction (like `top`→`bottom`).
- `colors` can be an array of color strings or an animated array (`AnimatedProp<Color[]>`).

</details>

---

## Constants

This library exports default constants for fallback colors, blur values, etc.:

| Constant                                    | Description                                                           |
| ------------------------------------------- | --------------------------------------------------------------------- |
| **`DEFAULT_SHADOW_OFFSET_SCALE`**           | Scale factor for default shadow offsets (e.g., `2`).                  |
| **`DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE`**  | Scale factor for reflected light offsets (e.g., `2`).                 |
| **`DEFAULT_BACKGROUND_COLOR`**              | Default background color (`#FFFFFF`).                                 |
| **`DEFAULT_REFLECTED_LIGHT_COLOR`**         | Default highlight color (`#EEE9E92D`).                                |
| **`DEFAULT_SHADOW_COLOR`**                  | Default main shadow color (`#2F2F2FBC`).                              |
| **`DEFAULT_SHADOW_BLUR`**                   | Default blur radius for the main shadow (`3`).                        |
| **`DEFAULT_REFLECTED_LIGHT_BLUR`**          | Default blur radius for the reflected light (`3`).                    |

---

## Notes & Tips

1. **Reflected Light**
   - When `inset` is `true`, `isReflectedLightEnabled` often defaults to `true`. Adjust `reflectedLightColor` and `reflectedLightOffset` for subtle or more dramatic highlights.

2. **Performance**
   - Each shadow component uses a Skia `<Canvas>`. For best results, **avoid** re-measuring every layout pass. You can specify a fixed `width` and `height` if the layout is static.

3. **Border Radii**
   - Only a single numeric `borderRadius` is fully supported. For advanced shapes or different corner radii, you’d need to draw custom paths with Skia.

4. **Testing**
   - If you have many shadows or toggles in a list, test on lower-end devices to ensure smooth performance. Skia + Reanimated is generally fast, but heavy usage might require memoization or other optimizations.

5. **Version Conflicts**
   - Because we rely on Skia and Reanimated, ensure your versions match the React Native environment. If you run into errors like “react-native-reanimated is not installed!”, move them to your project’s `peerDependencies` and install them at the root.

---

**We hope you enjoy building immersive, 3D-like UI components with `react-native-inner-shadow`.** If you have suggestions, bug reports, or want to contribute, please [open an issue](https://github.com/ShinMini/react-native-inner-shadow/issues) or create a pull request!
