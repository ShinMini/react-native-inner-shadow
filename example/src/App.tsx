import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ShadowView, LinearShadowView } from 'react-native-inner-shadow';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.shadowBox}>
        <ShadowView
          inset
          // isReflectedLightEnabled={false}
          style={styles.shadowView}
        >
          <Text style={styles.context}>Inner Shadow</Text>
        </ShadowView>

        <LinearShadowView
          // inset
          style={styles.shadowView}
          colors={['#E76F51', '#E9C46A']}
          from="bottom"
          to="top"
        >
          <Text style={styles.context}>With Linear</Text>
        </LinearShadowView>

        <ShadowView
          isReflectedLightEnabled
          // shadowBlur={10}
          // shadowOffset={{ width: 9, height: 9 }}
          // reflectedLightOffset={{ width: 4, height: 4 }}
          backgroundColor="#2A9D8F"
          style={styles.shadowView}
        >
          <Text style={styles.context}>Inner Shadow</Text>
        </ShadowView>

        <LinearShadowView
          inset
          style={styles.shadowView}
          colors={['#d3d0c9', '#393939']}
          from="top"
          to="right"
        >
          <Text style={styles.context}>With Linear</Text>
        </LinearShadowView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f1dae7',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  shadowBox: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  shadowView: {
    backgroundColor: '#fffeed',
    justifyContent: 'center',
    alignItems: 'center',
    width: 175,
    height: 175,
    borderRadius: 90,
  },
  context: {
    fontSize: 20,
    color: 'lightgray',
  },
});

export default App;
