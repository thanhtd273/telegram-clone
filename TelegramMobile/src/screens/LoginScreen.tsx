import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../utils/Color';
import Input from '../components/Auth/Input';
import IconButton from '../components/Core/IconButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const LoginScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your phone number</Text>
      <Text style={styles.belowLabel}>
        Please confirm your country code and enter your phone number
      </Text>
      <View style={styles.countryContainer}>
        <Text style={styles.countryLabel}>Country</Text>
        <TouchableOpacity style={styles.countryPicker}></TouchableOpacity>
      </View>

      <Input label="Phone number" />
      <IconButton
        name="arrow-right"
        style={styles.button}
        onPress={() => navigation.navigate('MainScreen')}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: Colors.theme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  belowLabel: {
    width: '60%',
    color: Colors.gray,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 20,
  },
  countryContainer: {
    width: '90%',
  },
  countryLabel: {
    fontSize: 16,
    color: Colors.purple,
    marginVertical: 4,
  },
  countryPicker: {
    width: '100%',
    height: 64,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.purple,
  },
  button: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
});
