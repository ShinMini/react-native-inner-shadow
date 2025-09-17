# react-native-inner-shadow

[English](https://www.npmjs.com/package/react-native-inner-shadow) | [한국어](https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/README.KR.md)

**react-native-inner-shadow** gives your React Native apps beautiful inset shadows and highlight effects using [React Native Skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation). Create depth in your UI with both solid and gradient backgrounds, plus interactive shadows that respond to touches using [Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started).

[![npm](https://img.shields.io/npm/v/react-native-inner-shadow.svg)](https://www.npmjs.com/package/react-native-inner-shadow) ![ISC License](https://img.shields.io/npm/l/react-native-inner-shadow.svg) <a href="https://github.com/ShinMini/react-native-inner-shadow"> <img src="https://img.shields.io/npm/types/typescript" alt="ts-banner" /> </a>
![downloads](https://img.shields.io/npm/dt/react-native-inner-shadow?style=flat-square) ![downloads](https://img.shields.io/npm/dm/react-native-inner-shadow?style=flat-square)

<div align="center">
  <img width="45%" max-width="450px" alt="Inner shadow & linear shadow sample" src="https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/imgs/rn-inner-shadow-thubnail.jpg?raw=true" />
  <img width="45%" max-width="450px" alt="Inner shadow pressable & toggle sample gif" src="https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/imgs/rn-inner-shadow-gif.gif?raw=true" />
</div>

## 🔄 What's New in v2.4.0

- **🌟 Radial Gradient Support**: Added comprehensive radial shadow functionality with `RadialShadowView`, `RadialShadowPressable`, and `RadialShadowToggle`
- **🧭 Extended Linear Directions**: Added diagonal direction support for LinearShadow components (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`)
- **🎨 Enhanced Styling**: Improved `backgroundColor` support through style props with better performance and flexibility
- **� Layout Improvements**: Fixed padding, margin, and transform style rendering issues for accurate shadow positioning
- **⚡ Performance Optimized**: Enhanced rendering performance with reduced repaint costs and smarter layout calculations
- **🏗️ Better Architecture**: Reorganized components with dedicated `shapes/` directory for improved project structure

<details>
  <summary>More details</summary>

- **New Radial Gradient Types**: Added `RadialInnerShadowProps`, `RadialShadowPressableProps`, and `RadialShadowToggleProps`
- **Diagonal Linear Gradients**: Extended `from` and `to` props to support diagonal directions: `'topLeft'`, `'topRight'`, `'bottomLeft'`, `'bottomRight'`
- **Fixed Dimension Support**: Enhanced width/height handling with priority: component prop > style prop > layout measurement
- **Styling Flexibility**: `backgroundColor` can now be set via style prop with improved performance
- **Layout Bug Fixes**: Resolved incorrect size calculations with padding, margin, and transform styles
- **Project Reorganization**: Moved `CornerRadii.tsx` and `ShadowLinearGradientFill.tsx` to dedicated `src/components/shapes/` directory
- **Performance Improvements**: Optimized rendering to minimize unnecessary re-renders and reduce computational overhead
- **Enhanced Type System**: Added `RadialGradientProps` interface and improved type safety across shadow components

</details>

## 📋 Table of Contents

- [react-native-inner-shadow](#react-native-inner-shadow)
  - [🔄 What's New in v2.4.0](#-whats-new-in-v240)
  - [📋 Table of Contents](#-table-of-contents)
  - [🚀 Installation](#-installation)
    - [Setup](#setup)
  - [🌟 Features](#-features)
  - [🧩 Basic Components](#-basic-components)
    - [ShadowView](#shadowview)
    - [LinearShadowView](#linearshadowview)
    - [RadialShadowView](#radialshadowview)
  - [🔄 Interactive Components](#-interactive-components)
    - [ShadowPressable](#shadowpressable)
    - [ShadowToggle](#shadowtoggle)
  - [🛠 Advanced Usage](#-advanced-usage)
    - [Custom Hooks](#custom-hooks)
      - [useShadowProperties](#useshadowproperties)
      - [useAnimatedOffset](#useanimatedoffset)
    - [Border Radius Control](#border-radius-control)
    - [Performance Tips](#performance-tips)
  - [📚 API Reference](#-api-reference)
    - [Constants](#constants)
    - [Component Props](#component-props)
  - [❓ Troubleshooting](#-troubleshooting)
    - [Common Issues](#common-issues)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)

## 🚀 Installation

```bash
# Using npm
npm install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# Using Yarn
yarn add react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# Using Expo
npx expo install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

### Setup

Add Reanimated to your Babel config:

```js
// babel.config.js
module.exports = {
  presets: [
    // Your existing presets
  ],
  plugins: [
    // Your existing plugins
    'react-native-reanimated/plugin',
  ],
};
```

For iOS, install pods:

```bash
cd ios && pod install && cd ..
```

## 🌟 Features

- **Inset shadows**: Create depth effects not possible with React Native's standard shadows
- **Reflected light**: Add subtle highlights for a more realistic 3D appearance
- **Linear gradients**: Combine shadows with beautiful linear gradient backgrounds including diagonal directions
- **Radial gradients**: Create circular gradient effects with customizable center and radius
- **Interactive components**:
  - Pressable buttons with tactile shadow animations
  - Toggle switches with state-dependent shadow effects
- **Custom styling**:
  - Per-corner border radius control
  - Precise control over shadow properties
  - Animated transitions
  - Enhanced backgroundColor support through style props
- **Performance optimized**:
  - Smart layout management
  - Minimal re-renders
  - Efficient canvas usage
  - Fixed dimension support with flexible width/height handling

## 🧩 Basic Components

### ShadowView

The foundation component for creating shadows with solid backgrounds:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { ShadowView } from 'react-native-inner-shadow';

export default function Example() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ShadowView
        inset
        backgroundColor="#f0f0f0"
        shadowColor="#00000066"
        shadowOffset={{ width: 3, height: 3 }}
        shadowBlur={5}
        style={{
          width: 150,
          height: 100,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Inset Shadow</Text>
      </ShadowView>
    </View>
  );
}
```

### LinearShadowView

For linear gradient backgrounds with shadows:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { LinearShadowView } from 'react-native-inner-shadow';

export default function LinearGradientExample() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearShadowView
        inset
        from="top"
        to="bottom"
        colors={['#FF7A7A', '#FFE08C']}
        shadowOffset={{ width: 4, height: 4 }}
        shadowBlur={8}
        style={{
          width: 150,
          height: 100,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Linear Gradient</Text>
      </LinearShadowView>
    </View>
  );
}
```

### RadialShadowView

For radial gradient backgrounds with shadows:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RadialShadowView } from 'react-native-inner-shadow';

export default function RadialGradientExample() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <RadialShadowView
        inset
        center={{ x: 0.5, y: 0.5 }}
        radius={0.8}
        colors={['#4FACFE', '#00F2FE']}
        shadowOffset={{ width: 3, height: 3 }}
        shadowBlur={6}
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Radial Gradient</Text>
      </RadialShadowView>
    </View>
  );
}
```

## 🔄 Interactive Components

### ShadowPressable

Create buttons with satisfying press animations:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { ShadowPressable } from 'react-native-inner-shadow';

export default function PressableExample() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ShadowPressable
        shadowBlur={6}
        duration={150}
        damping={0.8}
        style={{
          width: 180,
          height: 60,
          backgroundColor: '#0081a7',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => console.log('Pressed!')}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Press Me</Text>
      </ShadowPressable>
    </View>
  );
}
```

### ShadowToggle

Toggle components with state-dependent shadows:

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ShadowToggle } from 'react-native-inner-shadow';

export default function ToggleExample() {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ShadowToggle
        isActive={isActive}
        activeColor="#E9C46A"
        style={{
          width: 120,
          height: 60,
          backgroundColor: '#fefae0',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setIsActive((prev) => !prev)}
      >
        <Text
          style={{
            color: isActive ? '#515050' : '#888',
            fontWeight: 'bold',
          }}
        >
          {isActive ? 'ON' : 'OFF'}
        </Text>
      </ShadowToggle>
    </View>
  );
}
```

## 🛠 Advanced Usage

### Custom Hooks

The library provides powerful hooks for advanced customization:

#### useShadowProperties

Centralizes shadow configuration for consistent behavior:

```tsx
import { useShadowProperties } from 'react-native-inner-shadow';

// Inside your component:
const { flatStyle, bgColor, shadowProps, layout, canRenderCanvas, onLayout } =
  useShadowProperties({
    propWidth,
    propHeight,
    style,
    inset: true,
    shadowOffset: { width: 3, height: 3 },
    shadowBlur: 5,
    propsOnLayout: customOnLayoutHandler,
  });
```

#### useAnimatedOffset

Controls pressable animations with fine-grained control:

```tsx
import { useAnimatedOffset } from 'react-native-inner-shadow';

// Inside your component:
const {
  onPressIn,
  onPressOut,
  depth,
  offset,
  reflectedLightOffset,
  inset,
  blurRadius,
  PressedAnimatedStyle,
} = useAnimatedOffset({
  offset: shadowProps.shadowOffset,
  reflectedLightOffset: shadowProps.reflectedLightOffset,
  blurRadius: shadowProps.shadowBlur,
  damping: 0.8,
  duration: 150,
  onPressIn: customPressInHandler,
  onPressOut: customPressOutHandler,
});
```

### Border Radius Control

Customize each corner individually:

```tsx
<ShadowView
  style={{
    borderTopLeftRadius: 30,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 10,
    // Other styles
  }}
  // Other props
>
  <Text>Custom Corners</Text>
</ShadowView>
```

### Performance Tips

For best performance:

1. **Set fixed dimensions** whenever possible
2. **Memoize components** using React.memo() to prevent unnecessary re-renders
3. **Use stable keys** when rendering in lists
4. **Cache styles** instead of generating them on each render

```tsx
import React, { memo, useMemo } from 'react';
import { ShadowView } from 'react-native-inner-shadow';

const OptimizedShadowItem = memo(({ title, color }) => {
  const styles = useMemo(
    () => ({
      container: {
        width: 150,
        height: 100,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }),
    []
  );

  return (
    <ShadowView backgroundColor={color} inset style={styles.container}>
      <Text>{title}</Text>
    </ShadowView>
  );
});
```

## 📚 API Reference

### Constants

The library provides default values in `src/constants.ts`:

| Constant                     | Value       | Description                      |
| ---------------------------- | ----------- | -------------------------------- |
| CANVAS_PADDING               | 50          | Space to prevent shadow clipping |
| BACKGROUND_COLOR             | '#FFFFFF'   | Default background color         |
| SHADOW_OFFSET_SCALE          | 2.5         | Default shadow offset scale      |
| REFLECTED_LIGHT_OFFSET_SCALE | 2           | Default reflection offset scale  |
| SHADOW_BLUR                  | 2           | Default shadow blur radius       |
| REFLECTED_LIGHT_BLUR         | 3           | Default reflection blur radius   |
| SHADOW_COLOR                 | '#2F2F2FBC' | Default shadow color             |
| REFLECTED_LIGHT_COLOR        | '#FFFFFF4D' | Default reflection color         |
| DAMPING_DURATION             | 150         | Animation duration (ms)          |
| DAMPING_RATIO                | 0.8         | Animation damping ratio          |

### Component Props

<details>
<summary><b>ShadowView Props</b></summary>

| Prop                    | Type                              | Default                     | Description                              |
| ----------------------- | --------------------------------- | --------------------------- | ---------------------------------------- |
| inset                   | boolean                           | false                       | Makes shadow appear inside the component |
| backgroundColor         | string                            | '#FFFFFF'                   | Background color                         |
| shadowColor             | string                            | '#2F2F2FBC'                 | Shadow color                             |
| shadowOffset            | { width: number, height: number } | { width: 2.5, height: 2.5 } | Shadow position                          |
| shadowBlur              | number                            | 2                           | Shadow blur radius                       |
| reflectedLightColor     | string                            | '#FFFFFF4D'                 | Highlight color                          |
| reflectedLightOffset    | { width: number, height: number } | Auto-calculated             | Highlight position                       |
| reflectedLightBlur      | number                            | 3                           | Highlight blur radius                    |
| isReflectedLightEnabled | boolean                           | true                        | Whether to show highlights               |
| style                   | ViewStyle                         | -                           | React Native style object                |
| children                | ReactNode                         | -                           | Component children                       |

</details>

<details>
<summary><b>LinearShadowView Props</b> (extends ShadowView Props)</summary>

| Prop   | Type                                                                                   | Default  | Description              |
| ------ | -------------------------------------------------------------------------------------- | -------- | ------------------------ |
| from   | 'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' | 'top'    | Gradient start direction |
| to     | 'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' | 'bottom' | Gradient end direction   |
| colors | Color[]                                                                                | -        | Array of gradient colors |

</details>

<details>
<summary><b>RadialShadowView Props</b> (extends ShadowView Props)</summary>

| Prop   | Type                           | Default           | Description                                    |
| ------ | ------------------------------ | ----------------- | ---------------------------------------------- |
| center | { x: number, y: number }       | { x: 0.5, y: 0.5 } | Center point of radial gradient (0.0 to 1.0) |
| radius | number                         | 0.5               | Radius of radial gradient (0.0 to 1.0)        |
| colors | Color[]                        | -                 | Array of gradient colors                       |

</details>

<details>
<summary><b>ShadowPressable Props</b></summary>

| Prop                    | Type    | Default | Description                        |
| ----------------------- | ------- | ------- | ---------------------------------- |
| duration                | number  | 150     | Animation duration (ms)            |
| damping                 | number  | 0.8     | How deeply shadows indent on press |
| isReflectedLightEnabled | boolean | true    | Whether to show highlights         |
| ...ShadowView Props     | -       | -       | All ShadowView props are supported |
| ...PressableProps       | -       | -       | All React Native Pressable props   |

</details>

<details>
<summary><b>ShadowToggle Props</b></summary>

| Prop                     | Type    | Default | Description                  |
| ------------------------ | ------- | ------- | ---------------------------- |
| isActive                 | boolean | false   | Current toggle state         |
| activeColor              | string  | -       | Background color when active |
| ...ShadowPressable Props | -       | -       | All ShadowPressable props    |

</details>

## ❓ Troubleshooting

### Common Issues

1. **Shadows Not Showing**

   - Make sure width and height are defined (either in style or as props)
   - Check border radius values are reasonable for your component size
   - Verify shadow colors have opacity (e.g., '#00000066' not '#000000')

2. **Dependency Errors**

   - Ensure all three dependencies are properly installed
   - Check your babel.config.js includes 'react-native-reanimated/plugin'
   - For iOS, run pod install after installation
   - For Expo, make sure you're using compatible versions of all packages

3. **Performance Problems**

   - Specify fixed dimensions when possible
   - Use React.memo() for components in lists
   - Check if you're creating new styles on each render
   - For scrolling lists, consider virtualizing your list

4. **Gradient Not Working**
   - Verify your colors array has at least 2 colors
   - Check from/to directions are valid ('top', 'bottom', 'left', 'right')

## 🤝 Contributing

Contributions welcome! Check out our [Contributing Guide](https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/CONTRIBUTING.md) to get started.

## 📄 License

This project is [ISC licensed](https://github.com/ShinMini/react-native-inner-shadow/blob/main/LICENSE).

---

Built by [ShinMini](https://github.com/ShinMini) with ❤️
