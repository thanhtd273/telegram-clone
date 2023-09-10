import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Avatar from '../Chat/Avatar';
import Colors from '../../utils/Color';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props {
  name: string;
  lastMessage: string;
  isReadLastMessage: boolean;
  avatar?: string;
  conversationId: string;
}

const Conversation = ({
  name,
  lastMessage,
  isReadLastMessage,
  avatar,
  conversationId,
}: Props): JSX.Element => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('ChatScreen', {name, avatar, conversationId})
      }>
      <Avatar name={name} imageUrl={avatar} style={styles.avatar} />
      <View style={styles.infor}>
        <View style={styles.nameAndTime}>
          <Text style={styles.name}>
            {name.length < 20 ? name : name.slice(0, 20) + '...'}
          </Text>
          <Text style={styles.time}>17:28</Text>
        </View>
        <Text
          style={[
            styles.lastMessage,
            isReadLastMessage && {color: Colors.purple},
          ]}>
          {lastMessage.length < 40
            ? lastMessage
            : lastMessage.slice(0, 37) + '...'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 72,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    margin: 12,
    height: 50,
    width: 50,
  },
  infor: {
    height: '100%',
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#090909',
  },
  nameAndTime: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  name: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '500',
  },
  time: {
    color: Colors.gray,
    fontSize: 16,
  },
  lastMessage: {
    color: Colors.gray,
    fontSize: 18,
  },
});
