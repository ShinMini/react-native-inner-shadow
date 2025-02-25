import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { ShadowPressable } from 'react-native-inner-shadow';

export const ExampleShadowPressable = (): React.JSX.Element => {
  return (
    <ShadowPressable
      style={styles.shadowView}
      shadowOffset={{ width: 4, height: 4.5 }}
      duration={140}
      shadowBlur={1.5}
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
    width: 176,
    height: 76,
    // borderRadius: 50,
  },
  context: {
    fontSize: 20,
    color: 'white',
    fontWeight: 500,
  },
});
