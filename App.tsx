import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {InnerShadowView, LinearShadowView} from './src/index';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <InnerShadowView
        // inset
        isReflectedLightEnabled
        style={styles.shadowView}>
        <Text style={styles.context}>Inner Shadow</Text>
      </InnerShadowView>

      <LinearShadowView
        // inset
        style={styles.shadowView}
        shadowSpace={0}
        isReflectedLightEnabled
        // reflectedLightOffset={{width: 10, height: 10}}
        colors={['#d3d0c9', '#393939']}
        from="top"
        to="right">
        <Text style={styles.context}>With Linear</Text>
      </LinearShadowView>
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
    backgroundColor: '#fffeed',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 14,
  },
  context: {
    fontSize: 24,
  },
});

export default App;
