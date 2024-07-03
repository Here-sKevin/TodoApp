/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useLayoutEffect, useState } from 'react';
import {Image, View} from 'react-native';
import { useTranslation } from '../../shared/translations/Translations';
import notifee from '@notifee/react-native';
import { Button as ButtonComp } from '../../components/ui/Button'
import { Text as TextComp } from '../../components/ui/Text'
import { styles } from './HomeScreen.styles';
import useAuthentication from '../../shared/authentication/hooks/useAuthentication';
import { useNavigation } from '@react-navigation/native';
import { Switch } from '../../components/ui/Switch';

type Props = {
  navigation: {
    navigate: Function;
  };
};
const HomeScreen: React.FC<Props> = ({navigation}) => {
  const { T, changeLanguage, language } = useTranslation();
  const {logout, user} = useAuthentication();
  const nav = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    const changel = language === 'en' ? 'pt' : 'en';
    changeLanguage(changel);
  } 

  const redirect = () => {
    logout()
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav, isEnabled]);

  return (
    <>

      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={{width:'30%', }}><Switch label={language} onValueChange={toggleSwitch} value={isEnabled} /></View>              
              <ButtonComp
                title={T.home_screen.buttonTodo}
                size='md'
                //variant='outline'
                onPress={() => navigation.navigate('Todo')}
              />
              <ButtonComp
                title={T.home_screen.buttonPhoto}
                size='md'
                //variant='outline'
                onPress={() => navigation.navigate('Photo')}
              />
              <ButtonComp title={T.home_screen.buttonList} size='md' onPress={() => navigation.navigate('Users')}/>
              <ButtonComp title={T.home_screen.buttonnotification} size='md' onPress={() => onDisplayNotification()} />
        </View>
      </View>
    </>
  );
};



export default HomeScreen;
