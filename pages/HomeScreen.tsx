/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, Text, View} from 'react-native';
import { useTranslation } from '../shared/Translations';
import useAuthentication from '../shared/hooks/useAuthentication';
import notifee from '@notifee/react-native';

type Props = {
  navigation: {
    navigate: Function;
  };
};
const HomeScreen: React.FC<Props> = ({navigation}) => {
  const { T } = useTranslation();
  const {logout, user} = useAuthentication();

  const redirect = () => {
    logout(user?.username)
    //navigation.navigate('SignIn')
  }

   const onDisplayNotification = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Rumo ao Europeu',
      body: 'Inédito! Pepe acaba europeu sem cartões',
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon',
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <>
      <View>
        <Button title='Logout' onPress={redirect} />
        <Button
          title="Go to Todo"
          onPress={() => navigation.navigate('Todo')}
        />
        <Button
          title="Go to Photo"
          onPress={() => navigation.navigate('Photo')}
        />
        <Button title="Launch notification" onPress={() => onDisplayNotification()} />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{T.home_screen.welcome} {user?.username}</Text>
      </View>
    </>
  );
};

export default HomeScreen;
