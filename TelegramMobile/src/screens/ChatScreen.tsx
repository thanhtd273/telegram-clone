import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatInput from '../components/Chat/ChatInput';
import Colors from '../utils/Color';
import Message from '../components/Chat/Message';
import MessagesList from '../components/Chat/MessagesList';
import {addMessage, groupMessagesByUserId} from '../utils/Functions';
import {Message as MessageInterface} from '../interfaces/Message';
import {useRoute} from '@react-navigation/native';
import {MESSAGES} from '../data/messages';
import MessageActionOption from '../components/Chat/MessageActionOption';

interface Props {
  name: string;
  avatar?: string;
}

const ChatScreen = (): JSX.Element => {
  const route = useRoute<any>();
  const name = route.params.name;
  const avatar = route.params.avatar;
  const conversationId = route.params?.conversationId;

  const [messages, setMessages] = useState(MESSAGES);
  const [isOptionsShown, setOptionsShown] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <ChatHeader
        conversationId={conversationId}
        title={name}
        avatar={avatar ?? ''}
        setShowOptions={() => setOptionsShown(!isOptionsShown)}
      />
      <MessagesList data={groupMessagesByUserId(messages)} />
      <ChatInput sendMessage={message => setMessages([...messages, message])} />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
