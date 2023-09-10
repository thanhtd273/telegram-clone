import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CONVERSATIONS} from '../data/conversation';
import Avatar from '../components/Chat/Avatar';
import Sizes from '../utils/Size';
import Colors from '../utils/Color';
import NotifactionEnable from '../components/Core/NotificationEnable';
import UserCard from '../components/Profile/UserCard';
import AddUser from '../components/Profile/AddUser';
import {USERS} from '../data/users';

const ConversationDetail = (): JSX.Element => {
  const route = useRoute<any>();
  const id = route.params.conversationId;
  const navigation = useNavigation<NavigationProp<any>>();
  const conversation = CONVERSATIONS.find(item => item.id === id);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.header, {justifyContent: 'space-between'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={Sizes.icon} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={Sizes.icon} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Avatar imageUrl={conversation?.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{conversation?.name}</Text>
          <Text style={styles.figure}>1,675 members, 35 online</Text>
        </View>
      </View>
      <NotifactionEnable style={styles.notification} />
      <AddUser label="Add Members" />
      {USERS.map(user => (
        <UserCard
          userId={user.id}
          key={user.id}
          name={user.name}
          avatar={user.avatar}
        />
      ))}
      {USERS.map(user => (
        <UserCard
          userId={user.id}
          key={user.id}
          name={user.name}
          avatar={user.avatar}
        />
      ))}
      {USERS.map(user => (
        <UserCard
          userId={user.id}
          key={user.id}
          name={user.name}
          avatar={user.avatar}
        />
      ))}
    </ScrollView>
  );
};

export default ConversationDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  header: {
    padding: Sizes.mediumPadding,
    width: '100%',
    backgroundColor: Colors.theme200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: Sizes.name,
    color: Colors.white,
    fontWeight: 'bold',
  },
  figure: {
    color: Colors.gray,
    fontSize: 16,
  },
  notification: {
    marginBottom: 12,
  },
  addContact: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: Colors.theme,
  },
  text: {
    fontSize: 18,
    color: Colors.purple,
  },
});
