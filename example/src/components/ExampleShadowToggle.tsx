import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { ShadowToggle } from 'react-native-inner-shadow';

export const ExampleShadowToggle = (): React.JSX.Element => {
  const [isActive, setIsActive] = React.useState(false);
  const onPressToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <ShadowToggle
      style={styles.shadowView}
      isActive={isActive}
      activeColor="#E9C46A"
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
  );
};

const styles = StyleSheet.create({
  shadowView: {
    backgroundColor: '#fefae0',
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 78,
    borderRadius: 10,
  },
  context: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
  },
});
