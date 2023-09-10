import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
} from 'react-native';
import Colors from '../../utils/Color';

interface Props {
  label: string;
  inputProps?: TextInputProps;
}

const Input = ({label, inputProps}: Props): JSX.Element => {
  const input = useRef<TextInput>();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref => (input.current = ref!)}
          style={styles.input}
          {...inputProps}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    color: Colors.purple,
    marginVertical: 4,
  },
  input: {
    height: 64,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.purple,
  },
});
