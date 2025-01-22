import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import ShadowView from './src/components/InnerShadowView';
import LinearShadowView from './src/components/LinearInnerShadowView';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ShadowView inset style={styles.shadowView}>
        <Text style={styles.context}>Inner Shadow</Text>
      </ShadowView>

      <LinearShadowView
        style={styles.shadowView}
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
    backgroundColor: '#fffeede7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  shadowView: {
    backgroundColor: '#fffeede7',
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
