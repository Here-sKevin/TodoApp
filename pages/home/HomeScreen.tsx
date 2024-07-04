/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useLayoutEffect, useState } from 'react';
import {Image, Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    const changel = language === 'en' ? 'pt' : 'en';
    changeLanguage(changel);
  } 

  const redirect = () => {
    logout()
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
      headerLeft: () => (<Image style={{marginRight: 10}} source={require('../../images/home.png')} />),
      headerRight: () => (
        <>
          <View style={{ paddingRight: 10 }}>
            <TextComp size='md'>{T.home_screen.welcome} {user?.username} !</TextComp>
          </View>
          <View><ButtonComp title='Logout' size='sm' onPress={redirect} /></View>
        </>
        
      ),
      
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav, isEnabled]);

  return(
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{justifyContent: 'space-between', flex: 1, padding: 5}} horizontal>
      <View style={{padding:5}}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Todo')}>
          <Image
            source={require('../../images/to-do-list.png')}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={{padding:5}}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Photo')}>
          <Image
            source={require('../../images/gallery.png')}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={{padding:5}}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Users')}>
          <Image
            source={require('../../images/list.png')}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={{padding:5}}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => onDisplayNotification()}>
          <Image
            source={require('../../images/notification.png')}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      
      
    </ScrollView>
    <View style={{width:'30%', }}>
      <Switch label={language} onValueChange={toggleSwitch} value={isEnabled} />
    </View>
    <View style={{marginTop: 150, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity style={styles.card} onPress={() => setOpenModal(val => !val)}>
        <Image source={require('../../images/guide.png')} />
      </TouchableOpacity>

    </View>
    {openModal && (
      <Modal 
        transparent={false}
        animationType="slide"
        visible={openModal}
        onRequestClose={() => setOpenModal(val => !val)}
      >
        <ScrollView style={{padding: 10}}>
          <Text style={styles.title_guide}>1 - Configuração Inicial e Primeiros Passos [Iniciante]</Text>
          <Text style={styles.title_guide}>2 - Definir routing [Iniciante]</Text>
          <Text style={styles.title_guide}>3 - Desenvimento de screen Todo [Iniciante] </Text>
          <Text style={styles.title_guide}>4 - Desenvolvimento de screen Photos [Intermédio]</Text>
          <Text style={styles.title_guide}>5 - Authenticação (bd offline) e proteção de routes [Intermédio]</Text>
          <Text style={styles.title_guide}>6 - Push Notifications (In App) [Intermédio]</Text>
          <Text style={styles.title_guide}>7 - Geração de APK release para instalar no telemovel</Text>

        </ScrollView>
        
        <View style={styles.row}>
            <View style={styles.buttonContainerCancel}>
                <ButtonComp title="Close" onPress={() => setOpenModal(val => !val)} />
            </View>
        </View>

      </Modal>
    )}

    </View>
   
  )

  /*return (
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
  );*/
};



export default HomeScreen;
