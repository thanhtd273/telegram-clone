import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextStyle,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Colors from '../../utils/Color';
import {formatTimeSeen} from '../../utils/Functions';
import MessageActionOption from './MessageActionOption';

// import { theme } from "../../theme";

interface Props {
  time: Date;
  isLeft: boolean;
  message: string;
  onSwipe: (message: string, isLeft: boolean) => void;
}

const Message = ({time, isLeft, message, onSwipe}: Props) => {
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const [visible, setVisible] = useState(false);

  const isOnLeft = (type: string): TextStyle => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        // borderBottomLeftRadius: 0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: '#000',
      };
    } else if (isLeft && type === 'time') {
      return {
        color: 'darkgray',
      };
    } else if (!isLeft && type === 'avatar') {
      return {
        alignSelf: 'flex-end',
      };
    } else return {};
  };

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        uas,
        isLeft
          ? {flexDirection: 'row-reverse', alignSelf: 'flex-start'}
          : {alignSelf: 'flex-end'},
      ]}>
      <Pressable
        style={[styles.messageContainer, isOnLeft('messageContainer')]}
        onPress={() => setVisible(true)}>
        <View style={styles.messageView}>
          <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={[styles.time, isOnLeft('message')]}>
            {formatTimeSeen(time)}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    flexDirection: 'row',
  },
  messageContainer: {
    // paddingHorizontal: 8,
    minHeight: 40,
    maxWidth: '80%',
    backgroundColor: Colors.gray,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 10,
  },
  messageView: {
    // backgroundColor: 'transparent',
    maxWidth: '80%',
    paddingVertical: 2,
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  message: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  time: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    fontSize: 10,
  },
  avatar: {
    alignSelf: 'flex-end',
  },
});

export default Message;
