# react-native-inner-shadow

[English](.) | [한국어](https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/README.KR.md)

**react-native-inner-shadow** is a shadow component library that uses [React Native Skia](https://shopify.github.io/react-native-skia/) to create **inset shadows** and **reflected light** (highlight) effects. It supports both solid backgrounds (using `ShadowView`) and linear gradient backgrounds (using `LinearShadowView`) for building UIs with inset shadows. Additionally, it provides interactive components that animate press or toggle states using [Reanimated](https://docs.swmansion.com/react-native-reanimated/).

<p style="color: gray; font-size: 0.8em;">📢
*Note: For now, linear gradient backgrounds are not supported in button and toggle components.* - Feb 20, 2025
</p>

[![npm](https://img.shields.io/npm/v/react-native-inner-shadow.svg)](https://www.npmjs.com/package/react-native-inner-shadow) ![ISC License](https://img.shields.io/npm/l/react-native-inner-shadow.svg) <a href="https://github.com/ShinMini/react-native-inner-shadow"> <img src="https://img.shields.io/npm/types/typescript" alt="ts-banner" /> </a>

![downloads](https://img.shields.io/npm/dm/react-native-inner-shadow?style=flat-square)
<!-- ![downloads](https://img.shields.io/npm/dw/react-native-inner-shadow?style=flat-square) -->

---

## Installation

```bash
# Using npm:
npm install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# Or using Yarn:
yarn add react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

If you are using **Expo**, run the following command:

```bash
npx expo install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

> **❗Important❗**
> Please ensure that both **Skia** and **Reanimated** libraries are correctly installed and configured in your React Native project!
> For detailed installation instructions, refer to the [Skia documentation](https://shopify.github.io/react-native-skia/docs/getting-started/installation) and the [Reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/).

Also, add the `react-native-reanimated/plugin` to your `babel.config.js` file:

```js
// babel.config.js
module.exports = {
  presets: [
    // Keep your other presets here.
  ],
  plugins: [
    // Your other plugins...
    'react-native-reanimated/plugin',
  ],
};
```

After installing the dependencies, update the iOS pods by running:

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
    - [1. Simple Solid ShadowView](#1-simple-solid-shadowview)
    - [2. Linear Gradient \& Inset Shadow](#2-linear-gradient--inset-shadow)
  - [ShadowPressable](#shadowpressable)
    - [Example](#example)
    - [ShadowPressable Props](#shadowpressable-props)
  - [ShadowToggle](#shadowtoggle)
    - [When to Use](#when-to-use)
    - [Simple Example](#simple-example)
    - [Key Props](#key-props)
  - [API Specification](#api-specification)
    - [Components](#components)
    - [`InnerShadowProps` Type](#innershadowprops-type)
    - [`LinearInnerShadowProps` Type](#linearinnershadowprops-type)
  - [Constants](#constants)
  - [Note \& Tip](#note--tip)

---

## Preview

<div>
  <img width="45%" max-width="450px" alt="Inner shadow & linear shadow sample" src="https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/imgs/rn-inner-shadow-thubnail.jpg?raw=true" />
  <img width="45%" max-width="450px" alt="Inner shadow pressable & toggle sample gif" src="https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/imgs/rn-inner-shadow-pressable-thumbnail.gif?raw=true" />
</div>

---

## Features

- **Inset Shadows**: Create inset shadow effects that are not natively available in React Native.
- **Reflected Light**: Optionally add a highlight on the opposite side of the main shadow for a more three-dimensional, "pressed-in" look.
- **Solid or Linear Gradient**: Choose between a solid background (`ShadowView`) or a multi-color gradient background (`LinearShadowView`).
- **Pressable & Toggle Support**: Use interactive components (`ShadowPressable`, `ShadowToggle`) with animated press and toggle effects powered by [Reanimated](https://docs.swmansion.com/react-native-reanimated/).
- **High Performance**: Built on [React Native Skia](https://shopify.github.io/react-native-skia/), ensuring smooth and efficient cross-platform rendering.

---

## Usage Examples

### 1. Simple Solid ShadowView

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { ShadowView } from 'react-native-inner-shadow';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
        shadowOffset={{ width: 2, height: 2 }}
        shadowBlur={5}
        isReflectedLightEnabled={false}>
        <Text style={{ textAlign: 'center', color: '#2f2f2f', fontSize: 14 }}>
          inner-shadow
        </Text>
      </ShadowView>
    </View>
  );
}
```

### 2. Linear Gradient & Inset Shadow

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
        inset>
        {/* Add your content here */}
      </LinearShadowView>
    </View>
  );
}
```

---

## ShadowPressable

`ShadowPressable` is a specialized component that provides a "press in, press out" animation, giving the impression of a real button being pressed. When pressed, the shadow moves inward (creating an inset effect) and returns to its raised state upon release. This animation is implemented using both Skia and Reanimated.

### Example

```tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ShadowPressable } from 'react-native-inner-shadow';

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

| Prop                          | Type      | Default         | Description                                                                                   |
| ----------------------------- | --------- | --------------  | --------------------------------------------------------------------------------------------- |
| **`width`**                   | `number`  | `0`             | Manual width (optional; if a width is defined in the style, that value is used).              |
| **`height`**                  | `number`  | `0`             | Manual height (optional; if a height is defined in the style, that value is used).              |
| **`initialDepth`**            | `number`  | `3`             | Sets the initial shadow depth (the raised state).                                             |
| **`shadowSpace`**             | `number`  | `6`             | Extra space within the canvas to prevent clipping when using large blurs or offsets.           |
| **`shadowBlur`**              | `number`  | `6`            | The blur radius for the main shadow. Adjust this value for softer or sharper shadows.          |
| **`reflectedLightBlur`**      | `number`  | `3`             | The blur radius for the reflected light (highlight).                                          |
| **`shadowColor`**             | `string`  | `'#2F2F2FBC'`   | The color of the main shadow (can be semi-transparent).                                       |
| **`reflectedLightColor`**     | `string`  | `'#EEE9E92D'`   | The highlight color applied on the opposite side of the main shadow.                           |
| **`duration`**                | `number`  | `200`           | Animation duration (in milliseconds) for the press in/out transition.                          |
| **`damping`**                 | `number`  | `0.8`           | Controls how deeply the shadow insets when pressed (sometimes referred to as “damping”).         |
| **`isReflectedLightEnabled`** | `boolean` | `true`          | Determines whether to render the secondary reflected light shadow.                             |

**Behavior**

- **Press In:** When pressed, the shadow shifts inward (with a negative depth).
- **Release:** On release, the shadow returns to its raised (default) state.
- **Clipping:** If using large offsets or strong blur effects, increase `shadowSpace` to prevent clipping.

---

## ShadowToggle

`ShadowToggle` is a controlled component that toggles the inset shadow based on an external `isActive` prop.

- When `isActive` is `true`, the shadow shifts inward.
- When `isActive` is `false`, the shadow remains raised.
- Optionally, you can provide an `activeColor` to change the background color when the toggle is active.

### When to Use

- Use this component for toggle or switch style buttons where the pressed state is controlled externally.
- It is ideal when you want to visually indicate an active/inactive state with both an inset shadow and a background color change.

### Simple Example

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShadowToggle } from 'react-native-inner-shadow';

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
            { color: isActive ? '#515050' : '#eeebeb' },
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

| Prop                          | Type      | Default  | Description                                                                                         |
| ----------------------------- | --------- | -------  | --------------------------------------------------------------------------------------------------- |
| **`isActive`**                | `boolean` | `false`  | Determines the active state of the toggle. `true` shows an inset shadow, `false` shows a raised shadow. |
| **`activeColor`**             | `string`  | `null`   | Sets the background color when `isActive` is `true`.                                                |
| **`initialDepth`**            | `number`  | `3`      | Sets the initial shadow depth. When active, the depth value becomes negative to create an inset effect.  |
| **`shadowBlur`**              | `number`  | `6`     | Sets the blur radius for the main shadow.                                                          |
| **`shadowSpace`**             | `number`  | `6`      | Extra space allocated in the canvas to prevent clipping.                                           |
| **`shadowColor`**             | `string`  | `'#2F2F2FBC'` | The color of the main shadow (can be semi-transparent).                                        |
| **`reflectedLightColor`**     | `string`  | `'#EEE9E92D'` | The highlight color on the opposite side of the main shadow.                                    |
| **`damping`**                 | `number`  | `0.8`    | Controls how deeply the shadow insets when active.                                               |
| **`duration`**                | `number`  | `200`    | Animation duration (in milliseconds) for transitioning between active and inactive states.         |
| **`isReflectedLightEnabled`** | `boolean` | `true`   | Determines whether the reflected light effect is enabled.                                        |

**Behavior**

- When `isActive` is `true`, the shadow transitions to an inset state (negative depth).
- When `isActive` is `false`, the shadow returns to its raised state.
- If provided, the `activeColor` will be applied when the toggle is active, changing the background color.

**Notes**

- **Controlled vs. Uncontrolled:**
  It is recommended to control `isActive` via state (e.g., using `useState`) and pass it down as a prop. Alternatively, an internal state can be implemented if needed.
- **Performance Consideration:**
  When rendering many toggle components, especially on lower-end devices, test performance carefully. Fixed `width` and `height` values can help avoid excessive re-measurements.

---

## API Specification

This library provides multiple components for creating inset and toggleable shadows.

### Components

1. **`ShadowView`**
   A simple component for solid backgrounds that extends `ShadowViewProps`.
2. **`LinearShadowView`**
   A component for gradient backgrounds. It extends `InnerShadowProps` by adding gradient fields (`from`, `to`, `colors`).
3. **`ShadowPressable`**
   A pressable component with animated press effects.
4. **`ShadowToggle`**
   A controlled component that toggles the inset shadow based on the `isActive` prop.

---

### `InnerShadowProps` Type

<details open>
  <summary>Expand/Collapse</summary>

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

- This type defines basic shadow properties, along with optional settings for reflected light and sizing.
- `inset` determines whether the shadow is drawn inside (`true`) or outside (`false`).
- `shadowBlur` is typically set between 0 and 20 to achieve a soft diffusion effect.
- `style` accepts a standard React Native `ViewStyle`, which can include properties like `borderRadius`.

</details>

---

### `LinearInnerShadowProps` Type

<details>
  <summary>Expand/Collapse</summary>

```ts
export type LINEAR_DIRECTION = 'top' | 'bottom' | 'left' | 'right';

export interface LinearInnerShadowProps extends InnerShadowProps {
  from?: LINEAR_DIRECTION;
  to?: LINEAR_DIRECTION;
  colors: AnimatedProp<Color[]>;
}
```

- This type inherits all properties from `InnerShadowProps` and adds additional fields for gradient effects.
- `from` and `to` define the start and end directions for the gradient (for example, from `top` to `bottom`).
- `colors` is an array of color strings (or an animated array) used to create the gradient.

</details>

---

## Constants

This library includes a set of default constants (fallback colors, blur values, etc.) defined in the `src/constants.ts` file. These constants can be modified if needed.

| Constant                           | Description                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BACKGROUND_COLOR**               | Default background color (`#FFFFFF`).                                                                                                                         |
| **INITIAL_DEPTH**                  | The initial depth value for controlling the shadow effect (`3`).                                                                                              |
| **SHADOW_SPACE**                   | Extra space between the element and its shadow (`6`).                                                                                                         |
| **SHADOW_BLUR**                    | The blur radius for the main shadow; set to `6` to achieve a softer effect.                                                                                   |
| **REFLECTED_LIGHT_BLUR**           | The blur radius for the reflected light (highlight) effect (`3`).                                                                                             |
| **SHADOW_COLOR**                   | The main shadow color (`#2F2F2FBC`).                                                                                                                            |
| **REFLECTED_LIGHT_COLOR**          | The color used for the reflected light or highlight (`#EEE9E92D`).                                                                                             |
| **DAMPING_DURATION**               | Duration (in milliseconds) for the bounce animation when a button is pressed (`200`).                                                                          |
| **DAMPING_RATIO**                  | The ratio controlling the strength of the bounce effect (`0.8`).                                                                                               |
| **IS_REFLECTED_LIGHT_ENABLED**     | Flag indicating whether the reflected light effect is enabled (`true`).                                                                                       |
| **SHADOW_OFFSET_SCALE**            | Scale factor for the default shadow offset (default is `2`).                                                                                                  |
| **REFLECTED_LIGHT_OFFSET_SCALE**   | Scale factor for the reflected light offset (default is `2`).                                                                                                   |
| **COMMON_STYLES**                  | Predefined styles for the canvas and its wrapper. This ensures that the canvas is correctly positioned (with `position: absolute`) based on the parent’s `width` and `height`, and that the background is handled properly. |

---

## Note & Tip

1. **Reflected Light (Highlight)**
   - When `inset` is `true`, `isReflectedLightEnabled` is set to `true` by default.
     If the highlight effect appears too strong or too weak, adjust the `reflectedLightColor` and `reflectedLightOffset` values to achieve the desired look.

2. **Performance Optimization**
   - Each shadow component uses a Skia `<Canvas>`.
     For best performance, especially when the layout is fixed, specify fixed `width` and `height` values to avoid unnecessary re-measurements.

3. **Border Radii**
   - For pressable components, only a single numeric `borderRadius` is fully supported.
     If you need different radii for each corner, you may need to draw custom paths using Skia.
   - For general `ShadowView` or `LinearShadowView`, all `borderRadius` values supported by the style props are accepted (e.g., `topLeftRadius`, `bottomRightRadius`, etc.).

4. **Testing**
   - When rendering many shadow or toggle components in a list, ensure they work smoothly on lower-end devices.
     While Skia and Reanimated are generally efficient, performance may drop if many elements without fixed layout sizes are rendered.

5. **Version Conflicts**
   - This library depends on both Skia and Reanimated.
     Ensure that the versions of these libraries are compatible with your React Native environment.
     If you see errors like “react-native-reanimated is not installed!”, move the package to your project’s `peerDependencies` and install it at the root.

---

**Enjoy building immersive, 3D-like UI components with react-native-inner-shadow.**
If you have suggestions, bug reports, or would like to contribute, please [open an issue](https://github.com/ShinMini/react-native-inner-shadow/issues) or submit a pull request!
