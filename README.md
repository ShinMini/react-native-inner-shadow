# [React-Native-Inner-Shadow]

A React Native library for creating **inset shadows** and **reflected light** effects with [React Native Skia](https://shopify.github.io/react-native-skia/). Supports both **solid** and **linear gradient** backgrounds for advanced UI designs.

![npm](https://img.shields.io/npm/v/[YOUR_LIBRARY_NAME]?style=flat-square)
![license](https://img.shields.io/github/license/[USERNAME]/[YOUR_LIBRARY_NAME]?style=flat-square)
![downloads](https://img.shields.io/npm/dm/[YOUR_LIBRARY_NAME]?style=flat-square)

## Table of Contents

- [\[React-Native-Inner-Shadow\]](#react-native-inner-shadow)
  - [Table of Contents](#table-of-contents)
  - [Preview](#preview)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Reference](#api-reference)
    - [InnerShadowView](#innershadowview)
    - [LinearShadowView](#linearshadowview)
    - [Advanced Examples](#advanced-examples)
    - [Caveats \& Limitations](#caveats--limitations)
    - [License](#license)

---

## Preview

![Gif](./docs/Simulator%20Screen%20Recording%20-%20iPhone%2016%20Pro.gif)

```tsx

export default function InnerShadowExample() {

  return (
    <View style={styles.container}>

      <ShadowView inset style={styles.shadowView}>
        <Text style={styles.context}>Inner Shadow</Text>
      </ShadowView>

      <LinearShadowView style={styles.shadowView}
        colors={['#d3d0c9', '#393939']}
        from='top' to='right'
      >
        <Text style={styles.context}>With Linear</Text>
      </LinearShadowView>

    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
    shadowView: {
      backgroundColor: '#fffeede7',
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 300,
      borderRadius: 14,
    },
    context: {
      fontSize: 24,
    }
  })

```

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
npm install [YOUR_LIBRARY_NAME] @shopify/react-native-skia

# Using Yarn
yarn add [YOUR_LIBRARY_NAME] @shopify/react-native-skia
```

Note: You must have React Native Skia properly installed and configured in your React Native project.

## Usage

Inset Shadow with Solid Background

```tsx
import React from 'react';
import { View } from 'react-native';
import { InnerShadowView } from '[YOUR_LIBRARY_NAME]';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <InnerShadowView
        style={{ width: 200, height: 200, borderRadius: 20 }}
        inset
        shadowColor="#00000055"
        shadowOffset={{ width: 2, height: 2 }}
        shadowBlur={5}
        backgroundColor="#FFFFFF"
      >
        {/* Content goes here */}
      </InnerShadowView>
    </View>
  );
}
```

Inset Shadow with Linear Gradient

```tsx
import React from 'react';
import { View } from 'react-native';
import { LinearShadowView } from '[YOUR_LIBRARY_NAME]';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearShadowView
        style={{ width: 200, height: 200, borderRadius: 20 }}
        colors={['#FF7A7A', '#FFE08C']}
        from="top"
        to="bottom"
        inset
        shadowColor="#00000088"
        shadowOffset={{ width: 4, height: 4 }}
        shadowBlur={10}
      >
        {/* Content goes here */}
      </LinearShadowView>
    </View>
  );
}
```

---

## API Reference

### InnerShadowView

- `inset?: boolean`

   If true, the shadow is drawn inside the view; otherwise, it behaves more like a typical outer shadow.

- `shadowColor?: string`
The main shadow’s color (defaults to #2F2F2FBC).

- `shadowOffset?: { width: number; height: number }`
Offsets the shadow from the view’s origin. Positive values shift it down/right.

- `shadowBlur?: number`
The blur radius controlling how soft the shadow appears.

- `isReflectedLightEnabled?: boolean`
Toggles an additional highlight effect (default is true if inset is true).

- `reflectedLightColor?: string`
Color of the highlight (default #FFFFFF94).

- `reflectedLightOffset?: { width: number; height: number }`
Offset for the highlight, often the negative of shadowOffset for an opposite-corner effect.

- `reflectedLightBlur?: number`
Blur radius for the reflected light.

- `shadowSpace?: { dx: number; dy: number }`
Padding to prevent the shadow from being clipped.

- `backgroundColor?: string`
Fill color for the view’s background.

- **Any other** `PressableProps`
e.g., onPress, style, etc.

### LinearShadowView

All the props from `InnerShadowView` plus:

- `colors: AnimatedProp<Color[], any>`
The colors to be used for the linear gradient. Typically an array of strings.

- `from?: 'top' | 'bottom' | 'left' | 'right'`
Defines where the gradient starts.

- `to?: 'top' | 'bottom' | 'left' | 'right'`
Defines where the gradient ends.

> ***Note***: By default, if you omit from and to, it goes from 'top' to 'bottom'.

### Advanced Examples

1. **Diagonal Gradient**

- If you want a diagonal gradient, you can modify the code in utils or LinearShadowCanvas to compute diagonal vectors (e.g., top-left to bottom-right).

2. **Multiple Shadows**

- Nest multiple shadow components for layered effects.

3. **Performance Optimization**

- If you’re rendering many shadow views in a list, measure performance on older or lower-end devices. Consider memoizing certain components or limiting re-renders.

### Caveats & Limitations

- Skia Dependency
Requires @shopify/react-native-skia with proper installation and version alignment.

- Per-Corner Border Radius
Currently, only a uniform borderRadius is fully supported. Complex corners require additional logic.

- Android vs. iOS Differences
Skia works well cross-platform, but test your shadow offsets, especially if they’re large, to ensure they don’t get clipped.

---

Contributing
We welcome contributions! If you find a bug or have a feature request:

1. **Open an Issue** to discuss it.
2. **Fork the repo**, create a feature branch, and submit a Pull Request with relevant changes.

Please include tests and example usage when adding new features.

---

### License

This library is available under the MIT License.