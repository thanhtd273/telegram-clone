import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sizes from '../../utils/Size';
import Colors from '../../utils/Color';

const OPTIONS = [
  {
    id: 1,
    icon: 'arrow-left-top',
    name: 'Reply',
  },
  {
    id: 2,
    icon: 'content-copy',
    name: 'Copy',
  },
  {
    id: 3,
    icon: 'link',
    name: 'Copy link',
  },
  {
    id: 4,
    icon: 'arrow-right-top',
    name: 'Forward',
  },
  {
    id: 5,
    icon: 'exclamation',
    name: 'Report',
  },
];

interface Props {
  visible: boolean;
}

const MessageActionOption = ({visible}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Modal visible={visible} transparent={true} animationType="fade">
        {OPTIONS.map(item => (
          <View style={styles.option}>
            <Icon name={item.icon} size={Sizes.icon} color={Colors.gray} />
            <Text>{item.name}</Text>
          </View>
        ))}
      </Modal>
    </View>
  );
};

export default MessageActionOption;

const styles = StyleSheet.create({
  container: {
    // width: '50%',
    alignSelf: 'center',
    backgroundColor: Colors.theme,
  },
  option: {
    flexDirection: 'row',
  },
});
