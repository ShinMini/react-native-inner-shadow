# react-native-inner-shadow

[English](https://www.npmjs.com/package/react-native-inner-shadow) | [한국어](https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/README.KR.md)

**react-native-inner-shadow**는 [React Native Skia](https://shopify.github.io/react-native-skia/)를 활용해 **인셋(내부) 그림자**와 **반사광 효과**를 구현한 라이브러리입니다. [Reanimated](https://docs.swmansion.com/react-native-reanimated/)를 사용한 애니메이션 효과로 단색 배경과 그라데이션 배경 모두에서 자연스러운 그림자와 인터랙티브한 반응을 만들 수 있습니다.

[![npm](https://img.shields.io/npm/v/react-native-inner-shadow.svg)](https://www.npmjs.com/package/react-native-inner-shadow) ![ISC License](https://img.shields.io/npm/l/react-native-inner-shadow.svg) <a href="https://github.com/ShinMini/react-native-inner-shadow"> <img src="https://img.shields.io/npm/types/typescript" alt="ts-banner" /> </a>
![downloads](https://img.shields.io/npm/dm/react-native-inner-shadow?style=flat-square) ![downloads](https://img.shields.io/npm/dw/react-native-inner-shadow?style=flat-square)

<div align="center">
  <img width="45%" max-width="450px" alt="내부 그림자 및 선형 그림자 샘플" src="https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/imgs/rn-inner-shadow-thubnail.jpg?raw=true" />
  <img width="45%" max-width="450px" alt="내부 그림자 프레스 및 토글 샘플 gif" src="https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/imgs/rn-inner-shadow-gif.gif?raw=true" />
</div>

## 🔄 v2.4.0 업데이트 내용

- **🌟 방사형 그라데이션 지원**: `RadialShadowView`, `RadialShadowPressable`, `RadialShadowToggle`을 통한 포괄적인 방사형 그림자 기능
- **🧭 대각선 방향 지원**: LinearShadow 컴포넌트에 대각선 방향 지원 (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`)
- **🎨 향상된 스타일링**: 스타일 속성을 통한 `backgroundColor` 지원 개선으로 더 나은 성능과 유연성
- **� 레이아웃 개선**: 정확한 그림자 위치를 위한 패딩, 마진, 변형 스타일 렌더링 문제 수정
- **⚡ 성능 최적화**: 리페인트 비용 감소와 스마트한 레이아웃 계산으로 렌더링 성능 향상
- **🏗️ 아키텍처 개선**: 향상된 프로젝트 구조를 위한 전용 `shapes/` 디렉토리로 컴포넌트 재구성

<details>
  <summary>자세히 보기</summary>

- **새로운 방사형 그라데이션 타입**: `RadialInnerShadowProps`, `RadialShadowPressableProps`, `RadialShadowToggleProps` 추가
- **대각선 선형 그라데이션**: `from` 및 `to` 속성에 대각선 방향 지원: `'topLeft'`, `'topRight'`, `'bottomLeft'`, `'bottomRight'`
- **고정 치수 지원**: 우선순위가 있는 향상된 너비/높이 처리: 컴포넌트 속성 > 스타일 속성 > 레이아웃 측정
- **스타일링 유연성**: 향상된 성능으로 스타일 속성을 통해 `backgroundColor` 설정 가능
- **레이아웃 버그 수정**: 패딩, 마진, 변형 스타일 사용 시 잘못된 크기 계산 문제 해결
- **프로젝트 구조 정리**: `CornerRadii.tsx` 및 `ShadowLinearGradientFill.tsx`를 전용 `src/components/shapes/` 디렉토리로 이동
- **성능 개선**: 불필요한 리렌더링 최소화 및 계산 오버헤드 감소로 렌더링 최적화
- **타입 시스템 강화**: `RadialGradientProps` 인터페이스 추가 및 그림자 컴포넌트 전반에 걸친 타입 안전성 향상

</details>

## 📋 목차

- [react-native-inner-shadow](#react-native-inner-shadow)
  - [🔄 v2.4.0 업데이트 내용](#-v240-업데이트-내용)
  - [📋 목차](#-목차)
  - [🚀 설치](#-설치)
    - [설정](#설정)
  - [🌟 특징](#-특징)
  - [🧩 기본 컴포넌트](#-기본-컴포넌트)
    - [ShadowView](#shadowview)
    - [LinearShadowView](#linearshadowview)
    - [RadialShadowView](#radialshadowview)
  - [🔄 인터랙티브 컴포넌트](#-인터랙티브-컴포넌트)
    - [ShadowPressable](#shadowpressable)
    - [ShadowToggle](#shadowtoggle)
  - [🛠 고급 사용법](#-고급-사용법)
    - [커스텀 훅](#커스텀-훅)
      - [useShadowProperties](#useshadowproperties)
      - [useAnimatedOffset](#useanimatedoffset)
    - [보더 래디어스 컨트롤](#보더-래디어스-컨트롤)
    - [성능 최적화 팁](#성능-최적화-팁)
  - [📚 API 참조](#-api-참조)
    - [상수](#상수)
    - [컴포넌트 Props](#컴포넌트-props)
  - [❓ 문제 해결](#-문제-해결)
    - [일반적인 문제](#일반적인-문제)
  - [🤝 기여하기](#-기여하기)
  - [📄 라이센스](#-라이센스)

## 🚀 설치

```bash
# npm 사용
npm install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# Yarn 사용
yarn add react-native-inner-shadow @shopify/react-native-skia react-native-reanimated

# Expo 사용
npx expo install react-native-inner-shadow @shopify/react-native-skia react-native-reanimated
```

### 설정

Babel 설정에 Reanimated 플러그인 추가:

```js
// babel.config.js
module.exports = {
  presets: [
    // 기존 프리셋
  ],
  plugins: [
    // 기존 플러그인
    'react-native-reanimated/plugin',
  ],
};
```

iOS의 경우 pods 설치:

```bash
cd ios && pod install && cd ..
```

## 🌟 특징

- **인셋 그림자**: 리액트 네이티브에서 기본적으로 제공하지 않는 내부 그림자 효과
- **반사광 효과**: 더 사실적인 3D 느낌을 위한 미묘한 하이라이트
- **선형 그라데이션**: 대각선 방향을 포함한 아름다운 선형 그라데이션 배경과 그림자 조합
- **방사형 그라데이션**: 사용자 정의 가능한 중심점과 반지름을 가진 원형 그라데이션 효과
- **인터랙티브 컴포넌트**:
  - 그림자 애니메이션이 있는 프레서블 버튼
  - 상태에 따라 변하는 토글 스위치
- **커스텀 스타일링**:
  - 각 모서리별 보더 래디어스 제어
  - 그림자 속성에 대한 정밀한 조절
  - 애니메이션 전환 효과
  - 스타일 속성을 통한 향상된 backgroundColor 지원
- **성능 최적화**:
  - 스마트 레이아웃 관리
  - 최소한의 리렌더링
  - 효율적인 캔버스 활용
  - 유연한 너비/높이 처리로 고정 치수 지원

## 🧩 기본 컴포넌트

### ShadowView

단색 배경에 그림자를 생성하는 기본 컴포넌트:

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
          alignItems: 'center'
        }}
      >
        <Text>내부 그림자</Text>
      </ShadowView>
    </View>
  );
}
```

### LinearShadowView

선형 그라데이션 배경과 그림자를 결합:

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
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white' }}>선형 그라데이션</Text>
      </LinearShadowView>
    </View>
  );
}
```

### RadialShadowView

방사형 그라데이션 배경과 그림자를 결합:

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
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>방사형 그라데이션</Text>
      </RadialShadowView>
    </View>
  );
}
```

## 🔄 인터랙티브 컴포넌트

### ShadowPressable

만족스러운 누름 애니메이션이 있는 버튼 생성:

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
        onPress={() => console.log('누름!')}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>눌러보세요</Text>
      </ShadowPressable>
    </View>
  );
}
```

### ShadowToggle

상태에 따라 그림자가 변하는 토글 컴포넌트:

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
        onPress={() => setIsActive(prev => !prev)}
      >
        <Text style={{
          color: isActive ? '#515050' : '#888',
          fontWeight: 'bold'
        }}>
          {isActive ? 'ON' : 'OFF'}
        </Text>
      </ShadowToggle>
    </View>
  );
}
```

## 🛠 고급 사용법

### 커스텀 훅

라이브러리는 고급 사용자를 위한 강력한 훅을 제공합니다:

#### useShadowProperties

일관된 그림자 설정을 위한 중앙 집중식 구성:

```tsx
import { useShadowProperties } from 'react-native-inner-shadow';

// 컴포넌트 내에서:
const {
  flatStyle,
  bgColor,
  shadowProps,
  layout,
  canRenderCanvas,
  onLayout
} = useShadowProperties({
  propWidth,
  propHeight,
  style,
  inset: true,
  shadowOffset: { width: 3, height: 3 },
  shadowBlur: 5,
  propsOnLayout: 커스텀OnLayoutHandler
});
```

#### useAnimatedOffset

세밀한 제어로 프레서블 애니메이션 조작:

```tsx
import { useAnimatedOffset } from 'react-native-inner-shadow';

// 컴포넌트 내에서:
const {
  onPressIn,
  onPressOut,
  depth,
  offset,
  reflectedLightOffset,
  inset,
  blurRadius,
  PressedAnimatedStyle
} = useAnimatedOffset({
  offset: shadowProps.shadowOffset,
  reflectedLightOffset: shadowProps.reflectedLightOffset,
  blurRadius: shadowProps.shadowBlur,
  damping: 0.8,
  duration: 150,
  onPressIn: 커스텀PressInHandler,
  onPressOut: 커스텀PressOutHandler
});
```

### 보더 래디어스 컨트롤

각 모서리를 개별적으로 사용자 정의:

```tsx
<ShadowView
  style={{
    borderTopLeftRadius: 30,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 10,
    // 기타 스타일
  }}
  // 기타 속성
>
  <Text>커스텀 모서리</Text>
</ShadowView>
```

### 성능 최적화 팁

최상의 성능을 위해:

1. **고정 치수 설정**: 가능하면 항상 너비와 높이를 명시적으로 지정하세요
2. **컴포넌트 메모이제이션**: React.memo()를 사용하여 불필요한 리렌더링 방지
3. **안정적인 키 사용**: 리스트에서 렌더링할 때 고유하고 안정적인 키 사용
4. **스타일 캐싱**: 매 렌더링마다 새로운 스타일을 생성하지 마세요

```tsx
import React, { memo, useMemo } from 'react';
import { ShadowView } from 'react-native-inner-shadow';

const OptimizedShadowItem = memo(({ title, color }) => {
  const styles = useMemo(() => ({
    container: {
      width: 150,
      height: 100,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }), []);

  return (
    <ShadowView
      backgroundColor={color}
      inset
      style={styles.container}
    >
      <Text>{title}</Text>
    </ShadowView>
  );
});
```

## 📚 API 참조

### 상수

라이브러리는 `src/constants.ts`에 기본값을 제공합니다:

| 상수 | 값 | 설명 |
|----------|-------|-------------|
| CANVAS_PADDING | 50 | 그림자 잘림 방지를 위한 여백 |
| BACKGROUND_COLOR | '#FFFFFF' | 기본 배경색 |
| SHADOW_OFFSET_SCALE | 2.5 | 기본 그림자 오프셋 스케일 |
| REFLECTED_LIGHT_OFFSET_SCALE | 2 | 기본 반사광 오프셋 스케일 |
| SHADOW_BLUR | 2 | 기본 그림자 블러 반경 |
| REFLECTED_LIGHT_BLUR | 3 | 기본 반사광 블러 반경 |
| SHADOW_COLOR | '#2F2F2FBC' | 기본 그림자 색상 |
| REFLECTED_LIGHT_COLOR | '#FFFFFF4D' | 기본 반사광 색상 |
| DAMPING_DURATION | 150 | 애니메이션 지속 시간(ms) |
| DAMPING_RATIO | 0.8 | 애니메이션 감쇠 비율 |

### 컴포넌트 Props

<details>
<summary><b>ShadowView Props</b></summary>

| Prop | 타입 | 기본값 | 설명 |
|------|------|---------|-------------|
| inset | boolean | false | 그림자를 컴포넌트 내부에 표시 |
| backgroundColor | string | '#FFFFFF' | 배경색 |
| shadowColor | string | '#2F2F2FBC' | 그림자 색상 |
| shadowOffset | { width: number, height: number } | { width: 2.5, height: 2.5 } | 그림자 위치 |
| shadowBlur | number | 2 | 그림자 블러 반경 |
| reflectedLightColor | string | '#FFFFFF4D' | 하이라이트 색상 |
| reflectedLightOffset | { width: number, height: number } | 자동 계산 | 하이라이트 위치 |
| reflectedLightBlur | number | 3 | 하이라이트 블러 반경 |
| isReflectedLightEnabled | boolean | true | 하이라이트 표시 여부 |
| style | ViewStyle | - | React Native 스타일 객체 |
| children | ReactNode | - | 자식 컴포넌트 |

</details>

<details>
<summary><b>LinearShadowView Props</b> (ShadowView Props 확장)</summary>

| Prop | 타입 | 기본값 | 설명 |
|------|------|---------|-------------|
| from | 'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' | 'top' | 그라데이션 시작 방향 |
| to | 'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' | 'bottom' | 그라데이션 끝 방향 |
| colors | Color[] | - | 그라데이션 색상 배열 |

</details>

<details>
<summary><b>RadialShadowView Props</b> (ShadowView Props 확장)</summary>

| Prop | 타입 | 기본값 | 설명 |
|------|------|---------|-------------|
| center | { x: number, y: number } | { x: 0.5, y: 0.5 } | 방사형 그라데이션의 중심점 (0.0 ~ 1.0) |
| radius | number | 0.5 | 방사형 그라데이션의 반지름 (0.0 ~ 1.0) |
| colors | Color[] | - | 그라데이션 색상 배열 |

</details>

<details>
<summary><b>ShadowPressable Props</b></summary>

| Prop | 타입 | 기본값 | 설명 |
|------|------|---------|-------------|
| duration | number | 150 | 애니메이션 지속 시간(ms) |
| damping | number | 0.8 | 누를 때 그림자가 들어가는 정도 |
| isReflectedLightEnabled | boolean | true | 하이라이트 표시 여부 |
| ...ShadowView Props | - | - | 모든 ShadowView 속성 지원 |
| ...PressableProps | - | - | 모든 React Native Pressable 속성 |

</details>

<details>
<summary><b>ShadowToggle Props</b></summary>

| Prop | 타입 | 기본값 | 설명 |
|------|------|---------|-------------|
| isActive | boolean | false | 현재 토글 상태 |
| activeColor | string | - | 활성 상태일 때 배경색 |
| ...ShadowPressable Props | - | - | 모든 ShadowPressable 속성 |

</details>

## ❓ 문제 해결

### 일반적인 문제

1. **그림자가 보이지 않는 경우**
   - 너비와 높이가 정의되어 있는지 확인 (스타일 또는 속성으로)
   - 보더 래디어스 값이 컴포넌트 크기에 적절한지 확인
   - 그림자 색상에 투명도가 있는지 확인 (예: '#00000066', '#000000' 아님)

2. **의존성 오류**
   - 세 가지 의존성이 모두 제대로 설치되었는지 확인
   - babel.config.js에 'react-native-reanimated/plugin'이 포함되어 있는지 확인
   - iOS의 경우 설치 후 pod install 실행
   - Expo의 경우 모든 패키지의 호환 버전 확인

3. **성능 문제**
   - 가능한 경우 고정 치수 지정
   - 리스트의 컴포넌트에 React.memo() 사용
   - 매 렌더링마다 새 스타일을 생성하는지 확인
   - 스크롤 리스트의 경우 가상화된 리스트 고려

4. **그라데이션이 작동하지 않는 경우**
   - colors 배열에 최소 2개의 색상이 있는지 확인
   - from/to 방향이 유효한지 확인('top', 'bottom', 'left', 'right')

## 🤝 기여하기

기여는 언제나 환영합니다! 시작하려면 [기여 가이드](https://github.com/ShinMini/react-native-inner-shadow/blob/main/docs/CONTRIBUTING.md)를 확인하세요.

## 📄 라이센스

이 프로젝트는 [ISC 라이센스](https://github.com/ShinMini/react-native-inner-shadow/blob/main/LICENSE)입니다.

---

[ShinMini](https://github.com/ShinMini)가 ❤️로 만들었습니다.
