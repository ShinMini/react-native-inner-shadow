import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ShadowToggle } from 'react-native-inner-shadow';

function App(): React.JSX.Element {
  const [isActive, setIsActive] = React.useState(false);
  const onPressToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <ShadowToggle
        style={styles.shadowView}
        isActive={isActive}
        activeColor="#f2ef39"
        onPress={onPressToggle}
      >
        <Text
          style={[
            styles.context,
            {
              color: isActive ? 'gray' : '#333333',
            },
          ]}
        >
          {isActive ? 'ON' : 'OFF'}
        </Text>
      </ShadowToggle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f4e6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  shadowView: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 78,
    borderRadius: 10,
  },
  context: {
    fontSize: 20,
    color: 'gray',
  },
});

export default App;
