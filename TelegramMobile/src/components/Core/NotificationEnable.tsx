import React, {useState} from 'react';
import {StyleSheet, View, Text, Switch, ViewStyle} from 'react-native';
import Colors from '../../utils/Color';
import Sizes from '../../utils/Size';

interface Props {
  style?: ViewStyle;
}

const NotifactionEnable = ({style}: Props): JSX.Element => {
  const [notifactionEnable, setNotificationEnable] = useState(true);

  return (
    <View style={[styles.container, style]}>
      <View>
        <Text style={styles.text}>Notifications</Text>
        <Text style={styles.label}>{notifactionEnable ? 'On' : 'Off'}</Text>
      </View>
      <Switch
        value={notifactionEnable}
        onValueChange={() => setNotificationEnable(!notifactionEnable)}
        trackColor={{true: Colors.purple, false: Colors.gray}}
        thumbColor={notifactionEnable ? Colors.purple : Colors.gray}
      />
    </View>
  );
};

export default NotifactionEnable;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.theme300,
    paddingVertical: Sizes.mediumPadding,
    paddingHorizontal: Sizes.mediumPadding + 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
