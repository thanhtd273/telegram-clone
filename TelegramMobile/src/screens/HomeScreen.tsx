import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import Colors from '../utils/Color';
import Conversation from '../components/Conversation/Conversation';
import {CONVERSATIONS} from '../data/conversation';

const HomeScreen = (): JSX.Element => {
  const renderItem = ({item}: any) => {
    return (
      <Conversation
        name={item.name}
        lastMessage={item.lastMessage}
        conversationId={item.id}
        isReadLastMessage={true}
        avatar={item.avatar}
      />
    );
  };
  return (
    <FlatList
      data={CONVERSATIONS}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
  },
});
