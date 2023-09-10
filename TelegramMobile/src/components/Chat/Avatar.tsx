import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Colors from '../../utils/Color';

interface Props {
  name?: string;
  imageUrl?: string;
  style?: ViewStyle | ViewStyle[] | ImageStyle;
  onPress?: () => void;
}

const Avatar = ({name, imageUrl, style, onPress}: Props): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {imageUrl ? (
        <Image
          source={{uri: imageUrl}}
          style={[styles.image, {backgroundColor: 'transparent'}]}
        />
      ) : (
        <Text style={styles.text}>{name?.charAt(0).toUpperCase()}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#eea056',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '500',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    margin: 4,
  },
});
