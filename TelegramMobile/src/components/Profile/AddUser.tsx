import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../utils/Color';
import Sizes from '../../utils/Size';

interface Props {
  label: string;
  style?: ViewStyle;
}

const AddUser = ({label, style}: Props): JSX.Element => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Icon name="account-plus" size={Sizes.icon} color={Colors.purple} />
      <Text style={[styles.text, {marginLeft: 20}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    padding: Sizes.mediumPadding + 4,
    flexDirection: 'row',
    backgroundColor: Colors.theme,
  },
  text: {
    color: Colors.purple,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
    marginLeft: 20,
  },
});
