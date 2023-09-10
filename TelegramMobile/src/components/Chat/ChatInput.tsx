import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sizes from '../../utils/Size';
import Colors from '../../utils/Color';

interface Props {
  sendMessage: (message: any) => void;
}

const ChatInput = ({sendMessage}: Props): JSX.Element => {
  const [message, setMessage] = useState<string>('');
  const textInput = useRef<TextInput | null>();

  const handleSendingMessage = () => {
    sendMessage({content: message, createdAt: new Date(), userId: '0'});
    textInput.current?.clear();
    setMessage('');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="sticker-emoji" size={Sizes.icon} color={Colors.gray} />
      </TouchableOpacity>
      <TextInput
        ref={ref => (textInput.current = ref)}
        placeholder="Message"
        placeholderTextColor={Colors.gray}
        multiline={true}
        style={styles.input}
        onChangeText={(text: string) => setMessage(text)}
      />
      {message ? (
        <TouchableOpacity onPress={handleSendingMessage}>
          <Icon
            name="send"
            color={Colors.blue}
            size={Sizes.icon}
            style={{transform: [{rotate: '-45deg'}]}}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.attachmentAndMicrophone}>
          <TouchableOpacity>
            <Icon
              name="attachment"
              size={Sizes.icon}
              color={Colors.gray}
              style={{transform: [{rotate: '-45deg'}]}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="microphone" size={Sizes.icon} color={Colors.gray} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    // flex: 0.15,
    width: '100%',
    maxHeight: 64,
    padding: Sizes.mediumPadding,
    flexDirection: 'row',
    backgroundColor: Colors.theme,
    // bottom: 0,
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '70%',
    fontSize: 18,
    fontWeight: '500',
    color: Colors.white,
  },
  attachmentAndMicrophone: {
    width: '17%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
