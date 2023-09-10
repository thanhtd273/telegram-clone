import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Avatar from '../Chat/Avatar';
import Colors from '../../utils/Color';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props {
  userId: string;
  name: string;
  avatar?: string;
  lastSeenTime?: Date;
}

const UserCard = ({userId, name, avatar, lastSeenTime}: Props): JSX.Element => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProfileScreen', {userId})}>
      <Avatar name={name} style={styles.avatar} imageUrl={avatar} />
      <View style={styles.nameAndStatusContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>Last seen at 06:03</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.theme,
    flexDirection: 'row',
  },
  avatar: {},
  nameAndStatusContainer: {
    width: '80%',
    marginLeft: 20,
    paddingBottom: 6,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  name: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
  status: {
    color: Colors.gray,
    fontSize: 16,
  },
});
