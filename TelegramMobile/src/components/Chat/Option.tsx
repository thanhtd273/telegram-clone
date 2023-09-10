import React from 'react';
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CHAT_OPTIONS} from '../../utils/Constant';
import Sizes from '../../utils/Size';
import Colors from '../../utils/Color';

interface Props {
  setShown: () => void;
}

const Option = (): JSX.Element => {
  const renderItem = ({item}: any) => {
    // console.log(item);
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Icon
          name={item.icon}
          size={Sizes.icon}
          color={Colors.gray}
          style={styles.icon}
        />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={CHAT_OPTIONS}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    width: '60%',
    zIndex: 1,
    left: 200,
    right: 30,
    top: 0,
    borderRadius: 8,
    backgroundColor: Colors.theme,
  },
  itemContainer: {
    width: '100%',
    height: 50,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: Sizes.mediumPadding + 8,
  },
  name: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
});
