import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../utils/Color';
import Sizes from '../../utils/Size';

interface Props {
  lastMessage: string;
}

const PinnedMessage = ({lastMessage}: Props): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.label}>Pinned Message</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>

      <Icon
        name="pin"
        color={Colors.gray}
        size={Sizes.icon}
        style={{transform: [{rotate: '45deg'}]}}
      />
    </TouchableOpacity>
  );
};

export default PinnedMessage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Sizes.mediumPadding,
    paddingVertical: Sizes.mediumPadding - 4,
    backgroundColor: Colors.theme,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: Colors.purple,
    fontSize: 18,
    fontWeight: '500',
  },
  message: {
    color: Colors.gray,
    fontSize: 16,
  },
});
