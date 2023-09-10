import React, {useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Message from './Message';
import {Message as MessageInterface} from '../../interfaces/Message';
import {MessageGroup} from '../../interfaces/MessageGroup';
import Avatar from './Avatar';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props {
  onSwipeToReply?: () => void;
  data: MessageGroup[];
}

const MessagesList = ({data}: Props) => {
  const userId = useRef('0');
  const navigation = useNavigation<NavigationProp<any>>();
  const scrollView = useRef<FlatList<any> | null>();
  const renderMessage = ({item}: any) => {
    return (
      <View
        style={[
          styles.containerOnRight,
          item.userId !== userId.current && styles.containerOnLeft,
        ]}>
        <View>
          {item.messages.map((message: MessageInterface, index: number) => (
            <Message
              key={index}
              message={message.content}
              isLeft={message.userId !== userId.current}
              time={message.createdAt}
              onSwipe={() => {}}
            />
          ))}
        </View>
        {item.userId !== userId.current && (
          <Avatar
            name="T"
            style={{alignSelf: 'flex-end'}}
            onPress={() =>
              navigation.navigate('ProfileScreen', {userId: item.userId})
            }
          />
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderMessage}
      ref={ref => (scrollView.current = ref)}
      onContentSizeChange={() =>
        scrollView.current?.scrollToEnd({animated: true})
      }
    />
  );
};

export default MessagesList;

const styles = StyleSheet.create({
  containerOnRight: {
    marginVertical: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  containerOnLeft: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
  },
  avatar: {
    alignSelf: 'flex-end',
  },
});
