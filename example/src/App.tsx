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
      <ShadowView style={styles.shadowView} inset>
        <Text>ShadowView</Text>
      </ShadowView>
      <LinearShadowView
        // from="right"
        style={styles.shadowView}
        colors={['#f1c40f', '#e74c3c']}
      >
        <Text>LinearShadowView</Text>
      </LinearShadowView>
      <View style={styles.normalShadowView}>
        <Text>Normal View</Text>
      </View>
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
    // borderRadius: '30%',
    borderRadius: 30,
    borderTopStartRadius: 10,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,

    borderBottomLeftRadius: 1,
    borderBottomEndRadius: 50,
    marginTop: 10,
    padding: 10,
    width: '30%',
    aspectRatio: 1,
  },
  normalShadowView: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: '30%',
    borderRadius: 30,
    borderTopStartRadius: 10,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,

    borderBottomLeftRadius: 1,
    borderBottomEndRadius: 50,
    marginTop: 10,
    padding: 10,
    width: '30%',
    aspectRatio: 1,
    boxShadow: `inset 0 0 10px 0 rgba(0, 0, 0, 0.5)`,

    backgroundColor: '#FFF',
  },
});

export default App;
