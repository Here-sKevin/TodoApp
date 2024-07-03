/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useLayoutEffect } from 'react';
import {Image, Text, View} from 'react-native';
import { useTranslation } from '../../shared/translations/Translations';
import notifee from '@notifee/react-native';
import { Button as ButtonComp } from '../../components/ui/Button'
import { Text as TextComp } from '../../components/ui/Text'
import { styles } from './HomeScreen.styles';
import useAuthentication from '../../shared/authentication/hooks/useAuthentication';
import { useNavigation } from '@react-navigation/native';

type Props = {
  navigation: {
    navigate: Function;
  };
};
const HomeScreen: React.FC<Props> = ({navigation}) => {
  const { T } = useTranslation();
  const {logout, user} = useAuthentication();
  const nav = useNavigation();

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

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: 'Home',
      headerLeft: () => (<Image source={require('../../images/home.png')} />),
      headerRight: () => (
        <>
          <View style={{ paddingRight: 10 }}>
            <TextComp size='sm'>{T.home_screen.welcome} {user?.username} !</TextComp>
          </View>
          <View><ButtonComp title='Logout' size='sm' onPress={redirect} /></View>
        </>
        
      ),
      
    });
  }, [nav]);

  return (
    <>

      <View style={styles.container}>
        <View style={styles.wrapper}>
              <ButtonComp
                title="Go to Todo"
                size='md'
                //variant='outline'
                onPress={() => navigation.navigate('Todo')}
              />
              <ButtonComp
                title="Go to Photo"
                size='md'
                //variant='outline'
                onPress={() => navigation.navigate('Photo')}
              />
              <ButtonComp title="Launch notification" size='md' onPress={() => onDisplayNotification()} />
        </View>
      </View>
    </>
  );
};



export default HomeScreen;
