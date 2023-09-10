import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import Colors from '../../utils/Color';
import Sizes from '../../utils/Size';
import Avatar from '../Chat/Avatar';
import {User} from '../../interfaces/User';
import {USERS} from '../../data/users';

interface Props {
  userId: string;
}

const ProfileHeader = ({userId}: Props): JSX.Element => {
  const navigation = useNavigation<NavigationProp<any>>();
  const user = USERS.find(user => user.id === userId);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" color={Colors.white} size={Sizes.icon} />
      </TouchableOpacity>
      <View style={styles.avatarAndInfor}>
        <Avatar name={user?.name} imageUrl={user?.avatar} />
        <View style={styles.infor}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.status}>last seen recently</Text>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Icon name="phone" size={Sizes.icon} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={Sizes.icon} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.theme200,
    justifyContent: 'space-between',
  },
  avatarAndInfor: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infor: {
    paddingLeft: 12,
  },
  name: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    color: Colors.gray,
  },
  iconsContainer: {
    width: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
