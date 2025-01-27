import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ExampleShadowToggle } from './components/ExampleShadowToggle';
import { ExampleShadowPressable } from './components/ExampleShadowPressable';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ExampleShadowPressable />
      <ExampleShadowToggle />
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
});

export default App;
