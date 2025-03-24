import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ExampleShadowToggle } from './components/ExampleShadowToggle';
import { ExampleShadowPressable } from './components/ExampleShadowPressable';
import { LinearShadowView, ShadowView } from 'react-native-inner-shadow';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ShadowView style={styles.toggleContainer} inset>
        <ExampleShadowPressable />
      </ShadowView>

      <ShadowView style={styles.toggleContainer}>
        <ExampleShadowToggle />
      </ShadowView>
      <ShadowView style={styles.shadowView} inset backgroundColor="#82b3dc">
        <Text>ShadowView</Text>
      </ShadowView>
      <LinearShadowView
        from="top"
        to="right"
        shadowOffset={{ width: 10, height: 10 }}
        shadowColor="#000"
        shadowBlur={10}
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
    backgroundColor: '#f0f0f0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#ffe6a7',
    marginBottom: 10,
  },
  shadowView: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: '30%',
    borderRadius: 30,
    borderTopStartRadius: 10,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,

    borderBottomLeftRadius: 4,
    borderBottomEndRadius: 50,
    marginTop: 10,
    padding: 10,
    width: '30%',
    aspectRatio: 1,
  },
});

export default App;
