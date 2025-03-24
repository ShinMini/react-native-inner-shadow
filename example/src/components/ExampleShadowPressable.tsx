import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { ShadowPressable } from 'react-native-inner-shadow';

export const ExampleShadowPressable = (): React.JSX.Element => {
  const onPress = () => {
    console.log('Pressed!');
  };

  return (
    <ShadowPressable
      style={styles.shadowView}
      onPress={onPress}
      reflectedLightColor="#ffffff8d"
    >
      <Text style={[styles.context]}>Press Me!</Text>
    </ShadowPressable>
  );
};

const styles = StyleSheet.create({
  shadowView: {
    backgroundColor: '#0081a7',
    justifyContent: 'center',
    alignItems: 'center',
    width: 166,
    height: 66,

    borderRadius: 15,
    borderTopStartRadius: 50,
    borderTopLeftRadius: 50,
    borderTopEndRadius: 10,

    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 40,
  },
  context: {
    fontSize: 20,
    color: 'white',
    fontWeight: 700,
  },
});
