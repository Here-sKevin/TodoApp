/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { useTranslation } from '../shared/Translations';
import useAuthentication from '../shared/hooks/useAuthentication';
import notifee from '@notifee/react-native';
import { Button as ButtonComp } from '../components/ui/Button'
import { Text as TextComp } from '../components/ui/Text'

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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TextComp size='xl' color='secondary'>{T.home_screen.welcome} {user?.username}</TextComp>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.buttonContainer}>
            <ButtonComp title='Logout' size='md' onPress={redirect} />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonComp
              title="Go to Todo"
              size='md'
              variant='outline'
              onPress={() => navigation.navigate('Todo')}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.buttonContainer}>
            <ButtonComp
              title="Go to Photo"
              size='md'
              variant='outline'
              onPress={() => navigation.navigate('Photo')}
            />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonComp title="Launch notification" size='md' onPress={() => onDisplayNotification()} />
          </View>
        </View>
        


        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
  },
});

export default HomeScreen;
