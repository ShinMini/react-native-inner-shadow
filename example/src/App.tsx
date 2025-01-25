import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ShadowPressable } from 'react-native-inner-shadow';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ShadowPressable style={styles.shadowView}>
        <Text style={styles.context}>Toggle Me!</Text>
      </ShadowPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f1dae7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  shadowView: {
    backgroundColor: '#dff9dd',
    justifyContent: 'center',
    alignItems: 'center',
    width: 176,
    height: 76,
  },
  context: {
    fontSize: 20,
    color: 'gray',
  },
});

export default App;
