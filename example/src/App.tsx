import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  LinearShadowView,
  ShadowPressable,
  ShadowToggle,
  ShadowView,
} from 'react-native-inner-shadow';

function App(): React.JSX.Element {
  const [isActive, setIsActive] = React.useState(false);
  const onPressToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <ShadowView style={styles.toggleContainer} inset>
        <ShadowPressable
          style={styles.shadowPressable}
          // reflectedLightColor="red"
          shadowOffset={{ width: -4, height: -4 }}
          shadowBlur={3}
          duration={100}
          isReflectedLightEnabled // default: true
        >
          <Text style={[styles.context]}>Press Me!</Text>
        </ShadowPressable>
      </ShadowView>

      <ShadowView style={styles.toggleContainer}>
        <ShadowToggle
          style={styles.shadowToggle}
          isActive={isActive}
          activeColor="#E9C46A"
          onPress={onPressToggle}
          isReflectedLightEnabled={false}
        >
          <Text style={styles.toggleContext}>{isActive ? 'ON' : 'OFF'}</Text>
        </ShadowToggle>
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
  shadowToggle: {
    backgroundColor: '#fefae0',
    // backgroundColor: '#AeBa40',
    justifyContent: 'center',
    alignItems: 'center',
    width: 126,
    height: 66,
    borderRadius: 12,

    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  shadowPressable: {
    backgroundColor: '#0081a7',
    justifyContent: 'center',
    alignItems: 'center',
    width: 226,
    height: 60,

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
  toggleContext: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 700,
  },
});

export default App;
