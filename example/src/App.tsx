import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ExampleShadowToggle } from './components/ExampleShadowToggle';
import { ExampleShadowPressable } from './components/ExampleShadowPressable';
import { LinearShadowView, ShadowView } from 'react-native-inner-shadow';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ExampleShadowPressable />
      <ExampleShadowToggle />
      <ShadowView style={styles.shadowView} backgroundColor="#dc9ee6">
        <Text>ShadowView</Text>
      </ShadowView>
      <LinearShadowView
        inset
        // from="right"
        style={styles.shadowView}
        colors={['#f1c40f', '#e74c3c']}
      >
        <Text>LinearShadowView</Text>
      </LinearShadowView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe6a7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderTopLeftRadius: 10,
    marginTop: 10,
    padding: 10,
    width: '30%',
    aspectRatio: 1,
  },
});

export default App;
