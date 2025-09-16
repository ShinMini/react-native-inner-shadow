import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  LinearShadowView,
  ShadowToggle,
  ShadowView,
} from 'react-native-inner-shadow';
import { RadialShadowView } from '../../src/components/ShadowView';
import { RadialShadowPressable } from '../../src/components/ShadowPressable';

function App(): React.JSX.Element {
  const [isActive, setIsActive] = React.useState(false);
  const onPressToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <ShadowView style={styles.toggleContainer} inset>
        <RadialShadowPressable
          style={styles.shadowPressable}
          // reflectedLightColor="red"
          shadowOffset={{ width: -4, height: -4 }}
          shadowBlur={3}
          duration={100}
          isReflectedLightEnabled // default: true
          colors={['#3498db', '#2c3e50']}
        >
          <Text style={[styles.context]}>Press Me!</Text>
        </RadialShadowPressable>
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

      {/* <View style={styles.shadowView}>
        <Text style={styles.context}>ShadowView</Text>
      </View> */}
      <ShadowView style={styles.shadowView} inset backgroundColor="#82b3dc">
        <Text style={styles.context}>ShadowView</Text>
      </ShadowView>

      <LinearShadowView
        from="left"
        to="right"
        shadowOffset={{ width: 10, height: 10 }}
        shadowColor="#0000008c"
        shadowBlur={4}
        style={styles.shadowView}
        colors={['#ffeda5', '#e74c3c']}
      >
        <Text style={styles.context}>LinearShadowView</Text>
      </LinearShadowView>

      <RadialShadowView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderRadius: 90,
          marginTop: 10,
          width: 120,
          height: 120,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#daff47', '#3498db']}
        center={{ x: 0.5, y: 0.5 }}
        radius={0.5}
      >
        <Text style={styles.context}>RadialShadowView</Text>
      </RadialShadowView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    display: 'flex',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6f61',
    // borderRadius: '30%',
    borderRadius: 30,
    borderTopStartRadius: 10,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,

    borderBottomLeftRadius: 4,
    borderBottomEndRadius: 50,
    marginTop: 10,
    // padding: 10,

    width: 226,
    height: 60,
    // width: '30%',
    // aspectRatio: 1, // width / height = 3.5
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
    width: 180,
    height: 60,

    borderRadius: 15,
    borderTopStartRadius: 50,
    borderTopLeftRadius: 50,
    borderTopEndRadius: 10,

    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 40,
  },
  context: {
    fontSize: 16,
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
