import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../utils/Color';
import Avatar from './Avatar';
import Sizes from '../../utils/Size';
import Option from './Option';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import PinnedMessage from './PinnedMessage';

interface Props {
  conversationId: string;
  title: string;
  avatar: string;
  // isGroup?: boolean;
  // showOptions: boolean
  setShowOptions: () => void;
}

const ChatHeader = ({
  conversationId,
  title,
  avatar,

  setShowOptions,
}: Props): JSX.Element => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color={Colors.white} size={Sizes.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infor}
          onPress={() =>
            navigation.navigate('ConversationDetail', {conversationId})
          }>
          <Avatar imageUrl={avatar} name={title} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {title.length < 20 ? title : title.slice(0, 20) + '...'}
            </Text>
            <Text style={styles.status}>Connecting...</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={setShowOptions}>
          <Icon name="dots-vertical" color={Colors.white} size={Sizes.icon} />
        </TouchableOpacity>
      </View>
      <PinnedMessage lastMessage="Chao ca nha! Vay la chi con 4 ngay" />
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 72,
    paddingHorizontal: 8,
    backgroundColor: Colors.theme200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infor: {
    flexDirection: 'row',
    width: '80%',
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameContainer: {
    alignItems: 'flex-start',
    marginLeft: 12,
  },
  name: {
    fontSize: Sizes.name,
    fontWeight: 'bold',
    color: Colors.white,
  },
  status: {
    color: Colors.gray,
    fontSize: 16,
  },
});
