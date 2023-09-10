import React, {useState} from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/Color';
import Sizes from '../utils/Size';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ProfileHeader from '../components/Profile/ProfileHeader';
import NotifactionEnable from '../components/Core/NotificationEnable';
import AddUser from '../components/Profile/AddUser';
import {USERS} from '../data/users';

const ProfileScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<any>();
  const userId = route.params?.userId;
  const user = USERS.find(item => item.id === userId);
  return (
    <View style={styles.container}>
      <ProfileHeader userId={userId} />
      <View style={styles.inforContainer}>
        <Text style={styles.title}>Info</Text>
        <View style={styles.infor}>
          <View style={styles.usernameContainer}>
            <Text style={styles.text}>@{user?.name}</Text>
            <Text style={styles.label}>Username</Text>
          </View>
          <TouchableOpacity>
            <Icon name="qrcode" color={Colors.purple} size={Sizes.icon + 8} />
          </TouchableOpacity>
        </View>
      </View>
      <NotifactionEnable />
      <AddUser label="Add to contacts" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  title: {
    color: Colors.purple,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  inforContainer: {
    backgroundColor: Colors.theme300,
    paddingVertical: Sizes.mediumPadding,
    paddingHorizontal: Sizes.mediumPadding + 8,
  },
  infor: {
    paddingBottom: 16,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usernameContainer: {
    width: '80%',
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: Colors.gray,
  },
  addContact: {
    width: '100%',
    marginVertical: 12,
    padding: Sizes.mediumPadding,
    flexDirection: 'row',
    backgroundColor: Colors.theme,
  },
});
