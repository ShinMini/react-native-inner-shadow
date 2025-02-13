[English](https://github.com/ShinMini/react-native-inner-shadow) | 한국어

# react-native-inner-shadow

`react-native-inner-shadow`는 [React Native Skia](https://shopify.github.io/react-native-skia/)를 사용하여 **inset shadows**(내부 그림자)와 **reflected light**(반사광, 하이라이터) 효과를 구현할 수 있도록 도와줍니다. Advanced UI 디자인을 위해 **solid** 배경과 **linear gradient** 배경 모두를 지원하며, [Reanimated](https://docs.swmansion.com/react-native-reanimated/)를 활용해 버튼의 누름 상태나 토글 상태와 같은 인터랙티브한 효과도 구현할 수 있습니다.

[![npm](https://img.shields.io/npm/v/react-native-inner-shadow.svg)](https://www.npmjs.com/package/react-native-inner-shadow)
![license](https://img.shields.io/github/license/ShinMini/react-native-inner-shadow)
<a href="https://github.com/ShinMini/react-native-inner-shadow">
    <img src="https://img.shields.io/npm/types/typescript" />
</a>

![downloads](https://img.shields.io/npm/dm/react-native-inner-shadow?style=flat-square)
![downloads](https://img.shields.io/npm/dw/react-native-inner-shadow?style=flat-square)

---

## Installation

```bash
# npm을 사용하는 경우
npm install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# 또는 Yarn을 사용하는 경우
yarn add react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

만약 **Expo** 환경을 사용 중이라면, 다음 명령어를 실행하세요:

```bash
npx expo install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

> **중요**
> React Native 프로젝트에 **Skia**와 **Reanimated** 라이브러리가 올바르게 설치 및 설정되어 있는지 **반드시** 확인해주세요!
> 자세한 설치 가이드는 [Skia 문서](https://shopify.github.io/react-native-skia/docs/getting-started/installation)와 [Reanimated 설치 가이드](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)를 참조하세요.

또한, `babel.config.js` 파일에 `react-native-reanimated/plugin` 플러그인을 추가해야 합니다.

```js
// babel.config.js
module.exports = {
  presets: [
    // 다른 preset들은 그대로 둡니다.
  ],
  plugins: [
    // 다른 플러그인들...
    'react-native-reanimated/plugin',
  ],
};
```

의존성 설치 후에는 아래 명령어를 실행하여 iOS의 pod들도 업데이트하세요:

```bash
cd ios && bundle exec pod install && cd ..
```

---

## 목차

- [react-native-inner-shadow](#react-native-inner-shadow)
  - [Installation](#installation)
  - [목차](#목차)
  - [미리보기](#미리보기)
  - [특징](#특징)
  - [사용 예제](#사용-예제)
    - [1. 간단한 Solid ShadowView](#1-간단한-solid-shadowview)
    - [2. Linear Gradient \& 내부 그림자](#2-linear-gradient--내부-그림자)
  - [ShadowPressable](#shadowpressable)
    - [예제](#예제)
    - [ShadowPressable Props](#shadowpressable-props)
  - [ShadowToggle](#shadowtoggle)
    - [사용 시기](#사용-시기)
    - [간단한 예제](#간단한-예제)
    - [주요 Props](#주요-props)
    - [동작 방식](#동작-방식)
    - [주의사항](#주의사항)
  - [API 명세](#api-명세)
    - [컴포넌트](#컴포넌트)
    - [`InnerShadowProps` 타입](#innershadowprops-타입)
    - [`LinearInnerShadowProps` 타입](#linearinnershadowprops-타입)
  - [상수](#상수)
  - [Note \& Tip](#note--tip)

---

## 미리보기

<img width="45%" max-width="450px" alt="inner shadow & linear shadow sample" src="https://github.com/ShinMini/react-native-inner-shadow/tree/main/docs/imgs/rn-inner-shadow-thumbnail.jpg" />

<img width="45%" max-width="450px" alt="inner shadow pressable & toggle sample gif" src="https://github.com/ShinMini/react-native-inner-shadow/tree/main/docs/imgs/rn-inner-shadow-pressable-thumbnail.gif" />

---

## 특징

- **Inset Shadows**: React Native에서 기본적으로 제공하지 않는 내부 그림자 효과를 구현할 수 있습니다.
- **Reflected Light**: 메인 그림자 반대편에 선택적으로 하이라이트를 추가하여, 보다 입체적이고 ‘눌린’ 느낌의 효과를 연출할 수 있습니다.
- **Solid 또는 Linear Gradient**: 단색 배경(`InnerShadowView`)과 여러 색상 그라데이션 배경(`LinearShadowView`) 중 원하는 스타일을 선택할 수 있습니다.
- **Pressable & Toggle 지원**: [Reanimated](https://docs.swmansion.com/react-native-reanimated/)를 이용해 누름 효과와 토글 기능을 가진 인터랙티브 컴포넌트(`ShadowPressable`, `ShadowToggle`)를 제공합니다.
- **높은 성능**: [React Native Skia](https://shopify.github.io/react-native-skia/)를 기반으로 부드럽고 효율적인 크로스 플랫폼 렌더링을 구현합니다.

---

## 사용 예제

### 1. 간단한 Solid ShadowView

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

### 2. Linear Gradient & 내부 그림자

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
        {/* 여기에 콘텐츠 추가 */}
      </LinearShadowView>
    </View>
  );
}
```

---

## ShadowPressable

`ShadowPressable`은 **"press in, press out"** 애니메이션을 통해 실제 버튼을 누른 듯한 효과를 제공하는 특수 컴포넌트입니다. 기본적으로 버튼을 누르면 그림자가 내부로 들어가 ‘눌린’ 상태를 보여주며, 버튼을 떼면 원래의 상승된 상태로 복귀합니다. 이 애니메이션은 Skia(그림 그리기)와 Reanimated(애니메이션)를 사용하여 구현됩니다.

### 예제

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

| Prop                          | Type      | 기본값       | 설명                                                                                     |
| ----------------------------- | --------- | ------------- | ---------------------------------------------------------------------------------------- |
| **`width`**                   | `number`  | `0`           | 수동으로 지정할 너비입니다. (style에 width 값이 있다면 해당 값을 사용합니다.)             |
| **`height`**                  | `number`  | `0`           | 수동으로 지정할 높이입니다. (style에 height 값이 있다면 해당 값을 사용합니다.)             |
| **`initialDepth`**            | `number`  | `3`           | 그림자가 초기 상태에서 얼마나 “높게” 표현되는지를 설정합니다.                              |
| **`shadowSpace`**             | `number`  | `9`           | 큰 블러나 오프셋을 사용할 경우, 캔버스 내에서 클리핑되는 현상을 방지하기 위해 추가하는 공간입니다.  |
| **`shadowBlur`**              | `number`  | `20`          | 메인 그림자의 블러 반경을 지정합니다. 부드럽거나 뚜렷한 가장자리를 원할 때 조절합니다.         |
| **`shadowColor`**             | `string`  | `'#2F2F2FBC'` | 메인 그림자의 색상을 설정합니다. (반투명 색상 사용 가능)                                    |
| **`reflectedLightColor`**     | `string`  | `'#EEE9E92D'` | 메인 그림자와 반대쪽에 표시할 하이라이트 색상을 설정합니다.                                  |
| **`duration`**                | `number`  | `200`         | press in/out 전환 시 애니메이션의 지속 시간(밀리초)입니다.                                  |
| **`damping`**                 | `number`  | `0.8`         | 버튼을 누를 때 그림자가 얼마나 깊게 들어가는지를 조절하는 값입니다.                          |
| **`isReflectedLightEnabled`** | `boolean` | `true`        | 반사된 빛 효과를 추가로 그릴지 여부를 결정합니다.                                           |

**동작 방식**

- **Press In**: 버튼을 누르면 그림자가 내부로 이동하여 `depth < 0`인 상태가 됩니다.
- **Release**: 버튼에서 손을 떼면 그림자가 원래의 상승 상태로 복귀합니다.
- **클리핑 문제**: 큰 오프셋이나 강한 블러를 사용할 경우, `shadowSpace` 값을 늘려 클리핑 현상을 방지할 수 있습니다.

---

## ShadowToggle

`ShadowToggle`은 외부의 `isActive` prop에 따라 내부 그림자 상태를 토글하는, **controlled** 컴포넌트입니다.

- `isActive`가 `true`인 경우, 그림자가 내부로 들어가고
- `isActive`가 `false`인 경우, 그림자가 상승한 상태로 표시됩니다.
추가로 `activeColor`를 전달하면, 활성 상태일 때 배경색도 함께 전환할 수 있습니다.

### 사용 시기

- 토글 또는 스위치 스타일의 버튼이 필요하고, 누른 상태가 외부 로직에 의해 지속적으로 제어되어야 할 때 사용합니다.
- 내부 그림자 효과와 함께 배경색의 변화로 토글의 활성화 상태를 시각적으로 명확하게 표현하고자 할 때 적합합니다.

### 간단한 예제

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

### 주요 Props

| Prop                          | Type      | 기본값 | 설명                                                                                           |
| ----------------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------- |
| **`isActive`**                | `boolean` | `false` | 토글의 활성 여부를 결정합니다. `true`이면 내부 inset 상태, `false`이면 상승된 상태로 표시됩니다.  |
| **`activeColor`**             | `string`  | `null`  | 전달할 경우, `isActive`가 `true`일 때 배경색이 전환됩니다.                                       |
| **`initialDepth`**            | `number`  | `3`     | 기본 상태에서 그림자의 깊이를 설정합니다. 내부 inset 시에는 음수 값으로 전환됩니다.               |
| **`damping`**                 | `number`  | `0.8`   | `isActive`가 `true`일 때 그림자가 얼마나 깊게 inset 되는지를 조절합니다.                          |
| **`shadowBlur`**              | `number`  | `10`    | 메인 그림자의 블러 반경을 설정합니다.                                                          |
| **`shadowSpace`**             | `number`  | `6`     | 캔버스 내에서 클리핑을 방지하기 위해 추가로 확보할 공간입니다.                                  |
| **`duration`**                | `number`  | `200`   | 비활성에서 활성으로 혹은 그 반대로 전환될 때의 애니메이션 지속 시간(밀리초)입니다.                  |
| **`isReflectedLightEnabled`** | `boolean` | `true`  | 반사된 빛 효과를 사용할지 여부를 결정합니다.                                                  |

### 동작 방식

- `isActive`가 `true`이면 그림자가 내부 inset 상태(음수 depth)로 전환됩니다.
- `isActive`가 `false`이면 그림자가 기본 상승 상태로 돌아옵니다.
- 필요에 따라, `activeColor`가 적용되어 배경색도 변화할 수 있습니다.

### 주의사항

- **Controlled vs. Uncontrolled**: 보통은 `useState`와 같은 상태 관리로 `isActive` 값을 제어하여 하위 컴포넌트에 전달합니다. 필요에 따라 내부 상태로 구현할 수도 있습니다.
- **성능 고려**: 많은 토글 요소를 렌더링하는 경우, Skia와 Reanimated의 성능을 낮은 사양의 기기에서도 테스트해 보는 것이 좋습니다.

---

## API 명세

이 라이브러리는 내부 inset 그림자와 토글 가능한 그림자를 생성하는 여러 컴포넌트를 제공합니다.

### 컴포넌트

1. **`ShadowView`**
   - 단색 배경을 사용하는 간단한 방식의 컴포넌트입니다. `ShadowViewProps`를 상속합니다.
2. **`LinearShadowView`**
   - 그라데이션 효과를 위한 필드(`from`, `to`, `colors`)가 추가된 컴포넌트로, `InnerShadowProps`를 확장합니다.
3. **`ShadowPressable`**
   - 누름 애니메이션 효과를 적용한 Pressable 컴포넌트입니다.
4. **`ShadowToggle`**
   - 외부에서 `isActive` prop을 통해 제어되는 토글형 컴포넌트입니다.

---

### `InnerShadowProps` 타입

<details open>
  <summary>펼치기/접기</summary>

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

- 이 타입은 기본적인 그림자 속성과 선택적으로 반사된 빛 효과, 그리고 크기 설정을 정의합니다.
- `inset`은 그림자가 내부에 그려질지(`true`) 외부에 그려질지(`false`)를 결정합니다.
- `shadowBlur` 값은 부드러운 확산 효과를 위해 보통 0부터 20 사이의 값을 사용합니다.
- `style`에는 일반적인 React Native `ViewStyle`을 지정할 수 있으며, 예를 들어 `borderRadius`를 통해 모서리를 둥글게 만들 수 있습니다.

</details>

---

### `LinearInnerShadowProps` 타입

<details>
  <summary>펼치기/접기</summary>

```ts
export type LINEAR_DIRECTION = 'top' | 'bottom' | 'left' | 'right';

export interface LinearInnerShadowProps extends InnerShadowProps {
  from?: LINEAR_DIRECTION;
  to?: LINEAR_DIRECTION;
  colors: AnimatedProp<Color[]>;
}
```

- 이 타입은 `InnerShadowProps`의 모든 속성을 상속받으면서, 그라데이션 효과를 위해 추가 필드들을 포함합니다.
- `from`과 `to`는 그라데이션의 시작 방향과 종료 방향을 지정하며 (예: `top` → `bottom`),
- `colors`는 그라데이션에 사용할 색상 배열(또는 애니메이션 처리된 배열)을 설정합니다.

</details>

---

## 상수

라이브러리는 기본 값으로 사용할 여러 상수들을 제공합니다:

| 상수                                          | 설명                                                           |
| --------------------------------------------- | -------------------------------------------------------------- |
| **`DEFAULT_SHADOW_OFFSET_SCALE`**             | 기본 그림자 오프셋의 스케일 계수 (예: `2`).                      |
| **`DEFAULT_REFLECTED_LIGHT_OFFSET_SCALE`**    | 반사된 빛 오프셋의 스케일 계수 (예: `2`).                         |
| **`DEFAULT_BACKGROUND_COLOR`**                | 기본 배경색 (예: `#FFFFFF`).                                     |
| **`DEFAULT_REFLECTED_LIGHT_COLOR`**           | 기본 하이라이트 색상 (예: `#EEE9E92D`).                          |
| **`DEFAULT_SHADOW_COLOR`**                    | 기본 메인 그림자 색상 (예: `#2F2F2FBC`).                          |
| **`DEFAULT_SHADOW_BLUR`**                     | 메인 그림자의 기본 블러 반경 (예: `3`).                          |
| **`DEFAULT_REFLECTED_LIGHT_BLUR`**            | 반사된 빛의 기본 블러 반경 (예: `3`).                            |

---

## Note & Tip

1. **Reflected Light (반사광, 하이라이터)**
   - `inset`이 `true`일 경우, 기본적으로 `isReflectedLightEnabled`가 `true`로 설정됩니다.
     하이라이트 효과가 너무 강하거나 약하게 보인다면, `reflectedLightColor`와 `reflectedLightOffset` 값을 조정하여 미묘하거나 더 극적인 효과를 줄 수 있습니다.

2. **성능**
   - 각 그림자 컴포넌트는 Skia의 `<Canvas>`를 사용합니다.
     최상의 성능을 위해 레이아웃이 고정된 경우에는 고정된 `width`와 `height` 값을 지정하여 매번 재측정되는 것을 방지하는 것이 좋습니다.

3. **Border Radii (모서리 반경)**
   - 단일 숫자로 지정된 `borderRadius`만 완벽하게 지원됩니다.
     만약 각 모서리마다 다른 반경을 적용하고 싶다면, Skia로 커스텀 경로를 그려야 합니다.

4. **테스트**
   - 많은 그림자나 토글 컴포넌트를 리스트에 렌더링할 경우, 저사양 디바이스에서도 원활히 동작하는지 확인해 보세요.
     Skia와 Reanimated는 대체로 빠르지만, 경우에 따라 추가 최적화(예: memoization)가 필요할 수 있습니다.

5. **버전 충돌**
   - 본 라이브러리는 Skia와 Reanimated에 의존합니다.
     해당 라이브러리들의 버전이 사용 중인 React Native 환경과 호환되는지 반드시 확인하세요.
     만약 “react-native-reanimated is not installed!”와 같은 오류가 발생하면, 해당 패키지를 프로젝트의 `peerDependencies`로 이동시킨 후 루트에서 설치해야 합니다.

---

**react-native-inner-shadow**를 사용하여 몰입감 있고 3D와 같은 UI 컴포넌트를 구현하는 즐거움을 누리시길 바랍니다.
제안, 버그 리포트 또는 기여를 원하신다면, [여기에서 이슈를 등록](https://github.com/ShinMini/react-native-inner-shadow/issues)하거나 풀 리퀘스트를 보내주세요!
