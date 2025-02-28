# react-native-inner-shadow

English | [한국어](https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/README.KR.md)

**react-native-inner-shadow**는 [React Native Skia](https://shopify.github.io/react-native-skia/)를 사용하여 **인셋(내부) 그림자**와 **반사광(하이라이트) 효과**를 생성하는 그림자 컴포넌트 라이브러리입니다. 이 라이브러리는 단색 배경(예: `ShadowView`)과 선형 그라데이션 배경(예: `LinearShadowView`)을 모두 지원하여 인셋 그림자를 활용한 UI를 구성할 수 있습니다. 또한, [Reanimated](https://docs.swmansion.com/react-native-reanimated/)를 사용하여 프레스나 토글 상태에 애니메이션 효과를 제공하는 인터랙티브 컴포넌트들도 함께 제공합니다.

<p style="color: gray; font-size: 0.8em;">🎉
*참고하세요!: 이제, 모든 그림자 컴포넌트에 리니어 그레디언트 및 디테일한 border-radius 값 적용이 가능합니다! - v2.0.0~
</p>

[![npm](https://img.shields.io/npm/v/react-native-inner-shadow.svg)](https://www.npmjs.com/package/react-native-inner-shadow) ![ISC License](https://img.shields.io/npm/l/react-native-inner-shadow.svg) <a href="https://github.com/ShinMini/react-native-inner-shadow"> <img src="https://img.shields.io/npm/types/typescript" alt="ts-banner" /> </a>

![downloads](https://img.shields.io/npm/dm/react-native-inner-shadow?style=flat-square)
<!-- ![downloads](https://img.shields.io/npm/dw/react-native-inner-shadow?style=flat-square) -->

---

<h2 style="color: #555555; font-style: italic;">v2.0.0의 새로운 기능</h2>

## v2.0.0

- feat!: can configure any border corner to any shadow component
- **refactor!**: 복잡한 코드를 제거하여 프레스 컴포넌트를 단순화하고, `shadowSpace`를 **더 이상 사용하지 않음(Deprecated)**.
- refactor: adjust damping calculation in useAnimatedOffset hook
- **refactor**: 그림자 타입을 개선하고 타입 문서를 강화하였습니다.
- **feat**: 선형 그라데이션 지원과 함께 `ShadowPressable`과 `ShadowToggle`을 통합하였습니다.
- **feat**: `LinearShadowPressable` 및 `LinearShadowToggle` 컴포넌트를 새로 추가하여 내장되었습니다.
- **refactor(chore)**: 사용하지 않는 `SHADOW_SPACE` 상수를 제거하였습니다.
- **docs**: 포괄적인 주석과 예제를 통해 타입 문서를 개선하였습니다.
- **Note**: 최신 업데이트 및 변경 사항은 [CHANGELOG](https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/CHANGELOG.md)를 참조하세요.

---

## 설치

```bash
# npm 사용 시:
npm install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# 또는 Yarn 사용 시:
yarn add react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

Expo를 사용하는 경우:

```bash
npx expo install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

> **❗중요❗**
> React Native 프로젝트에 **Skia**와 **Reanimated** 라이브러리가 올바르게 설치되고 구성되어 있는지 반드시 확인하세요!
> 자세한 설치 방법은 [Skia 문서](https://shopify.github.io/react-native-skia/docs/getting-started/installation)와 [Reanimated 설치 가이드](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)를 참조하세요.

또한, `babel.config.js` 파일에 `react-native-reanimated/plugin`을 추가하세요:

```js
// babel.config.js
module.exports = {
  presets: [
    // 기존의 프리셋들...
  ],
  plugins: [
    // 기존의 플러그인들...
    'react-native-reanimated/plugin',
  ],
};
```

의존성을 설치한 후, iOS의 경우 다음 명령어로 Pods를 업데이트하세요:

```bash
cd ios && bundle exec pod install && cd ..
```

---

## 목차

- [react-native-inner-shadow](#react-native-inner-shadow)
  - [v2.0.0](#v200)
  - [설치](#설치)
  - [목차](#목차)
  - [미리보기](#미리보기)
  - [특징](#특징)
  - [사용 예제](#사용-예제)
    - [1. Simple Solid ShadowView](#1-simple-solid-shadowview)
    - [2. Linear Gradient \& Inset Shadow](#2-linear-gradient--inset-shadow)
  - [ShadowPressable](#shadowpressable)
    - [예제](#예제)
    - [ShadowPressable Props](#shadowpressable-props)
  - [ShadowToggle](#shadowtoggle)
    - [사용 시점](#사용-시점)
    - [간단 예제](#간단-예제)
    - [핵심 Props](#핵심-props)
  - [API 명세](#api-명세)
    - [주요 컴포넌트](#주요-컴포넌트)
    - [주요 타입 정의](#주요-타입-정의)
  - [상수](#상수)
  - [주의사항 및 팁](#주의사항-및-팁)

---

## 미리보기

<div>
  <img width="45%" max-width="450px" alt="내부 그림자 및 선형 그림자 샘플" src="https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/imgs/rn-inner-shadow-thubnail.jpg?raw=true" />
  <img width="45%" max-width="450px" alt="내부 그림자 프레스 및 토글 샘플 gif" src="https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/imgs/rn-inner-shadow-gif?raw=true" />
</div>

---

## 특징

- **인셋 그림자:**
  기본적으로 제공되지 않는 인셋 그림자 효과를 구현할 수 있습니다.
- **반사광(하이라이트):**
  메인 그림자의 반대쪽에 하이라이트를 추가하여 더욱 입체적인 효과를 줍니다.
- **단색 및 선형 그라데이션 지원:**
  단색 배경(ShadowView)과 다채로운 선형 그라데이션 배경(LinearShadowView)을 선택할 수 있습니다.
- **프레스 및 토글 인터랙션:**
  Reanimated를 사용하여 버튼 프레스 및 토글 시 부드러운 애니메이션 효과를 제공합니다.
- **고성능:**
  React Native Skia를 기반으로 하여 크로스플랫폼에서 빠르고 효율적으로 렌더링됩니다.
- **타입스크립트 완벽 지원:**
  포괄적인 타입 정의와 문서를 통해 개발자가 안심하고 사용할 수 있습니다.

---

## 사용 예제

### 1. Simple Solid ShadowView

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { ShadowView } from 'react-native-inner-shadow';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ShadowView
        inset
        width={120}
        height={120}
        backgroundColor="#f0f0f0"
        style={{ borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
        shadowColor="#00000066"
        shadowOffset={{ width: 2, height: 2 }}
        shadowBlur={5}
        isReflectedLightEnabled
      >
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
        {/* 내부에 원하는 콘텐츠를 추가하세요 */}
      </LinearShadowView>
    </View>
  );
}
```

---

## ShadowPressable

`ShadowPressable`은 실제 버튼을 누르는 느낌을 주기 위해 프레스 애니메이션을 적용한 특수 컴포넌트입니다.
버튼을 누르면 그림자가 안으로 들어가고, 버튼에서 손을 떼면 다시 원래의 높이로 복귀합니다. 이 애니메이션은 Skia와 Reanimated를 사용하여 구현되었습니다.

### 예제

```tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ShadowPressable } from 'react-native-inner-shadow';

export default function PressableExample() {
  return (
    <View style={styles.container}>
      <ShadowPressable style={styles.button} shadowBlur={7} duration={200} damping={1.2}>
        <Text style={styles.label}>Press Me</Text>
      </ShadowPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { width: 120, height: 63, backgroundColor: '#E5A9A9', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#F4E4BA' },
});
```

### ShadowPressable Props

<details close>
  <summary>펼치기/접기</summary>

| Prop                          | Type      | Default         | 설명                                                                                             |
| ----------------------------- | --------- | --------------  | --------------------------------------------------------------------------------------------- |
| **`width`**                   | `number`  | `0`             | (선택적) 수동 너비. 스타일에 정의된 값이 있으면 해당 값이 사용됩니다.                           |
| **`height`**                  | `number`  | `0`             | (선택적) 수동 높이. 스타일에 정의된 값이 있으면 해당 값이 사용됩니다.                           |
| **`initialDepth`**            | `number`  | `3`             | @deprecated - 대신 `shadowOffset`를 사용하세요.                                               |
| **`shadowSpace`**             | `number`  | `6`             | @deprecated - 대신 `shadowOffset`를 사용하세요.                                               |
| **`shadowBlur`**              | `number`  | `2`             | 메인 그림자의 블러 반경. 그림자를 부드럽게 또는 선명하게 하려면 이 값을 조절하세요.              |
| **`reflectedLightBlur`**      | `number`  | `3`             | 반사광(하이라이트)의 블러 반경.                                                              |
| **`shadowColor`**             | `string`  | `'#2F2F2FBC'`   | 메인 그림자의 색상 (반투명 가능).                                                           |
| **`reflectedLightColor`**     | `string`  | `'#FFFFFF8D'`   | 메인 그림자 반대쪽에 적용될 하이라이트 색상.                                                  |
| **`duration`**                | `number`  | `150`           | 프레스 애니메이션의 지속 시간 (밀리초 단위).                                                  |
| **`damping`**                 | `number`  | `0.8`           | 프레스 시 그림자가 들어가는 정도(“댐핑” 정도)를 제어합니다.                                  |
| **`isReflectedLightEnabled`** | `boolean` | `true`          | 보조 반사광 효과를 렌더링할지 여부를 결정합니다.                                              |

**동작 방식**

- **프레스 인:** 사용자가 버튼을 누르면 그림자가 내부로 이동합니다.
- **릴리즈:** 버튼에서 손을 떼면 그림자가 원래의 상태로 복귀합니다.
- **참고:** 선택적으로 `activeColor`를 지정하여 활성 상태일 때 배경색을 변경할 수 있습니다.

</details>

---

## ShadowToggle

`ShadowToggle`은 외부에서 `isActive` 프롭을 제어하여 그림자가 토글되는 컴포넌트입니다.

- `isActive`가 `true`일 경우 그림자가 내부로 전환됩니다.
- `isActive`가 `false`면 그림자가 기본적으로 표시됩니다.
- 선택적으로 `activeColor`를 제공하여 활성 시 배경색을 변경할 수 있습니다.

### 사용 시점

- 토글 또는 스위치 스타일 버튼으로 사용할 때 적합합니다.
- 활성/비활성 상태를 시각적으로 구분할 때 유용합니다.

### 간단 예제

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShadowToggle } from 'react-native-inner-shadow';

export default function ToggleExample() {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <ShadowToggle
        style={styles.toggle}
        isActive={isActive}
        activeColor="#FFD700"
        onPress={() => setIsActive(prev => !prev)}>
        <Text style={[styles.label, { color: isActive ? '#515050' : '#eeebeb' }]}>
          {isActive ? 'ON' : 'OFF'}
        </Text>
      </ShadowToggle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  toggle: { width: '30%', aspectRatio: 1.7, borderRadius: 12, backgroundColor: '#06d6a0', justifyContent: 'center', alignItems: 'center' },
  label: { fontWeight: 'bold' },
});
```

### 핵심 Props

<details close>
  <summary>펼치기/접기</summary>

| Prop                          | Type      | Default  | 설명                                                                                         |
| ----------------------------- | --------- | -------  | ------------------------------------------------------------------------------------------- |
| **`isActive`**                | `boolean` | `false`  | 토글의 현재 상태. `true`이면 내부 그림자가 표시되고, `false`이면 기본 그림자가 표시됩니다.    |
| **`activeColor`**             | `string`  | `null`   | 활성 상태일 때 적용할 배경색입니다.                                                        |
| **`width`**                   | `number`  | `0`      | (선택적) 수동 너비. 스타일에 정의된 값이 사용됩니다.                                          |
| **`height`**                  | `number`  | `0`      | (선택적) 수동 높이. 스타일에 정의된 값이 사용됩니다.                                          |
| **`initialDepth`**            | `number`  | `3`      | @deprecated – 대신 `shadowOffset`를 사용하세요.                                              |
| **`shadowSpace`**             | `number`  | `6`      | @deprecated – 대신 `shadowOffset`를 사용하세요.                                              |
| **`shadowBlur`**              | `number`  | `2`      | 메인 그림자의 블러 반경.                                                                     |
| **`reflectedLightBlur`**      | `number`  | `3`      | 반사광(하이라이트)의 블러 반경.                                                              |
| **`shadowColor`**             | `string`  | `'#2F2F2FBC'` | 메인 그림자의 색상 (반투명 가능).                                                         |
| **`reflectedLightColor`**     | `string`  | `'#FFFFFF8D'` | 반사광(하이라이트) 색상.                                                                    |
| **`duration`**                | `number`  | `150`    | 프레스 애니메이션의 지속 시간 (밀리초).                                                      |
| **`damping`**                 | `number`  | `0.8`    | 프레스 시 그림자가 들어가는 정도를 제어합니다.                                                |
| **`isReflectedLightEnabled`** | `boolean` | `true`   | 반사광 효과를 렌더링할지 여부를 결정합니다.                                                  |

</details>

---

## API 명세

이 라이브러리는 인셋 그림자와 토글 가능한 그림자를 생성하기 위한 여러 컴포넌트를 제공합니다.

### 주요 컴포넌트

1. **`ShadowView`**
   - 단색 배경에 인셋 그림자를 적용하는 기본 컴포넌트입니다.
2. **`LinearShadowView`**
   - 선형 그라데이션 배경에 인셋 그림자를 적용합니다. `InnerShadowProps`에 gradient 관련 필드를 추가한 형태입니다.
3. **`ShadowPressable`**
   - 프레스 애니메이션을 가진 인터랙티브 컴포넌트로, 버튼처럼 작동합니다.
4. **`ShadowToggle`**
   - 외부에서 제어하는 토글 상태에 따라 인셋 그림자를 표시하는 컴포넌트입니다.

### 주요 타입 정의

- **`InnerShadowProps` & `ShadowProps`:**
  그림자의 기본 스타일(인셋 여부, 색상, 오프셋, 블러 등)을 정의합니다.
- **`GradientLinearProps` & `LinearInnerShadowProps`:**
  선형 그라데이션 효과를 위한 추가 속성을 정의합니다.

자세한 타입 정보는 코드 내부의 주석과 TSDoc을 참고하세요.

---

## 상수

이 라이브러리는 그림자 관련 기본 값(예: 기본 배경색, 블러 값 등)을 제공하는 상수를 포함하고 있습니다. 이 상수들은 `src/constants.ts` 파일에 정의되어 있으며, 필요에 따라 수정할 수 있습니다.

| 상수                         | 설명                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| **BACKGROUND_COLOR**         | 그림자 컴포넌트의 기본 배경색 (`#FFFFFF`).                                                          |
| **INITIAL_DEPTH**            | 그림자 효과의 초기 깊이 (현재는 `shadowOffset`로 대체됨).                                           |
| **SHADOW_BLUR**              | 메인 그림자의 기본 블러 값 (`2`).                                                                   |
| **REFLECTED_LIGHT_BLUR**     | 반사광 효과의 블러 값 (`3`).                                                                         |
| **SHADOW_COLOR**             | 메인 그림자의 기본 색상 (`#2F2F2FBC`).                                                              |
| **REFLECTED_LIGHT_COLOR**    | 반사광(하이라이트)의 기본 색상 (`#EEE9E92D`).                                                       |
| **DAMPING_DURATION**         | 프레스 애니메이션 지속 시간 (밀리초 단위, `200ms`).                                                  |
| **DAMPING_RATIO**            | 프레스 애니메이션 댐핑 비율 (`0.8`).                                                                 |
| **IS_REFLECTED_LIGHT_ENABLED** | 반사광 효과 활성화 기본값 (`true`).                                                              |
| **SHADOW_OFFSET_SCALE**      | 기본 그림자 오프셋의 스케일 계수 (기본값 `2`).                                                      |
| **REFLECTED_LIGHT_OFFSET_SCALE** | 반사광 오프셋의 스케일 계수 (기본값 `2`).                                                     |
| **COMMON_STYLES**            | 캔버스 및 래퍼의 미리 정의된 스타일. 이 스타일은 부모의 너비와 높이에 맞게 캔버스 위치를 조정하고 배경을 처리합니다. |

---

## 주의사항 및 팁

1. **반사광(하이라이트) 효과:**
   기본적으로 인셋 그림자에서는 `isReflectedLightEnabled`가 `true`로 설정됩니다. 만약 하이라이트 효과가 너무 강하거나 약하다면, `reflectedLightColor`와 `reflectedLightOffset` 값을 조절해 보세요.

2. **성능 최적화:**
   각 그림자 컴포넌트는 Skia의 `<Canvas>`를 사용합니다. 레이아웃이 고정된 경우, `width`와 `height`,그리고 `backgroundColor`값을 명시적으로 지정하여 불필요한 재측정이 일어나지 않도록 하는 것이 좋습니다.
을
3. **테스트:**
   여러 그림자 또는 토글 컴포넌트를 리스트 형태로 렌더링할 때, 특히 저사양 기기에서 성능에 주의하세요. Skia와 Reanimated는 일반적으로 효율적이지만, 레이아웃 사이즈가 고정되지 않으면 성능 저하가 발생할 수 있습니다.

4. **버전 충돌:**
   이 라이브러리는 Skia와 Reanimated에 의존합니다. React Native 환경과 호환되는 버전을 사용 중인지 확인하세요. 만약 “react-native-reanimated is not installed!” 등의 오류가 발생하면, 해당 패키지를 `peerDependencies`로 옮기고 루트에 설치하세요.

---

**즐겁게 3D 느낌의 UI를 구축하세요!**
버그 리포트, 제안, 혹은 기여를 원하시면 [이슈를 열거나](https://github.com/ShinMini/react-native-inner-shadow/issues) 풀 리퀘스트를 제출해 주세요.
