import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/Color';
import Sizes from '../../utils/Size';

interface Props {
  name: string;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}
const IconButton = ({name, style, onPress}: Props): JSX.Element => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon name={name} color={Colors.white} size={Sizes.icon} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: Colors.purple,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
