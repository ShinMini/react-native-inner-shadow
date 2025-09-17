import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  LinearShadowView,
  ShadowToggle,
  ShadowView,
  RadialShadowView,
  LinearShadowPressable,
} from 'react-native-inner-shadow';

// 상수 정의
const COLORS = {
  background: '#f0f0f0',
  primary: '#ff6f61',
  secondary: '#3498db',
  accent: '#E9C46A',
  toggle: '#ffe6a7',
  pressable: '#0081a7',
  white: '#ffffff',
  black: '#2c3e50',
  gray: '#666666',
  lightGray: '#e6e6e6',
  shadowLight: '#fefae0',
} as const;

const DIMENSIONS = {
  containerWidth: 226,
  containerHeight: 60,
  toggleWidth: 126,
  toggleHeight: 66,
  pressableWidth: 180,
  pressableHeight: 60,
  radialSize: 120,
} as const;

const BORDER_RADIUS = {
  small: 10,
  medium: 15,
  large: 30,
  xlarge: 50,
} as const;

function App(): React.JSX.Element {
  const [isToggleActive, setIsToggleActive] = React.useState(false);

  const handleTogglePress = React.useCallback(() => {
    setIsToggleActive((prev) => !prev);
  }, []);

  return (
    <View style={styles.container}>
      {/* Shadow Pressable Section */}
      <ShadowView
        style={[styles.sectionContainer, styles.pressableContainer]}
        inset
      >
        <LinearShadowPressable
          style={styles.shadowPressable}
          shadowBlur={3}
          duration={100}
          isReflectedLightEnabled
          colors={[COLORS.secondary, COLORS.black]}
        >
          <Text style={styles.whiteText}>Shadow Pressable</Text>
        </LinearShadowPressable>
      </ShadowView>

      {/* Toggle Section */}
      <ShadowView style={styles.sectionContainer}>
        <ShadowToggle
          style={styles.shadowToggle}
          isActive={isToggleActive}
          activeColor={COLORS.accent}
          onPress={handleTogglePress}
          isReflectedLightEnabled={false}
        >
          <Text style={styles.grayText}>{isToggleActive ? 'ON' : 'OFF'}</Text>
        </ShadowToggle>
      </ShadowView>

      {/* Inset Shadow View Section */}
      <ShadowView
        style={styles.shadowView}
        inset
        backgroundColor={COLORS.lightGray}
      >
        <Text style={styles.grayText}>ShadowView</Text>
      </ShadowView>

      {/* Linear Shadow View Section */}
      <LinearShadowView
        from="topLeft"
        to="bottomRight"
        shadowOffset={{ width: 10, height: 10 }}
        shadowColor="rgba(0, 0, 0, 0.55)"
        shadowBlur={4}
        style={styles.shadowView}
        colors={['#ffeda5', '#e74c3c']}
      >
        <Text style={styles.blackText}>LinearShadowView</Text>
      </LinearShadowView>

      {/* Radial Shadow View Section */}
      <RadialShadowView
        style={styles.radialShadowView}
        width={DIMENSIONS.radialSize}
        height={DIMENSIONS.radialSize}
        colors={['#daff47', COLORS.secondary]}
        center={{ x: 0.5, y: 0.5 }}
        radius={0.5}
      >
        <Text style={styles.blackText}>Radial{'\n'}ShadowView</Text>
      </RadialShadowView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  // Section Containers
  sectionContainer: {
    padding: 5,
    borderRadius: BORDER_RADIUS.medium,
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },

  pressableContainer: {
    borderTopRightRadius: 35,
    borderBottomEndRadius: 35,
    backgroundColor: COLORS.lightGray,
  },

  // Shadow Components
  shadowPressable: {
    backgroundColor: COLORS.pressable,
    justifyContent: 'center',
    alignItems: 'center',
    width: DIMENSIONS.pressableWidth,
    height: DIMENSIONS.pressableHeight,
    borderRadius: BORDER_RADIUS.medium,
    borderTopStartRadius: BORDER_RADIUS.small,
    borderTopLeftRadius: BORDER_RADIUS.small,
    borderTopEndRadius: 25,
    borderBottomLeftRadius: BORDER_RADIUS.small,
    borderBottomEndRadius: 25,
  },

  shadowToggle: {
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    width: DIMENSIONS.toggleWidth,
    height: DIMENSIONS.toggleHeight,
    borderRadius: 12,
    borderTopLeftRadius: BORDER_RADIUS.xlarge,
    borderTopRightRadius: BORDER_RADIUS.xlarge,
    borderBottomLeftRadius: BORDER_RADIUS.small,
    borderBottomRightRadius: BORDER_RADIUS.small,
  },

  shadowView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: DIMENSIONS.containerWidth,
    height: DIMENSIONS.containerHeight,
    marginTop: 10,
    padding: 10,
    borderRadius: BORDER_RADIUS.large,
    borderTopLeftRadius: 10,
    borderTopStartRadius: BORDER_RADIUS.small,
    borderTopRightRadius: 20,
    borderTopEndRadius: 5,

    borderBottomLeftRadius: 10,
    borderBottomStartRadius: BORDER_RADIUS.small,
    borderBottomRightRadius: 10,
    borderBottomEndRadius: BORDER_RADIUS.xlarge,
  },

  radialShadowView: {
    borderRadius: 90,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text Styles
  whiteText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '700',
    textAlign: 'center',
  },

  grayText: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: '700',
    textAlign: 'center',
  },

  blackText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default App;
