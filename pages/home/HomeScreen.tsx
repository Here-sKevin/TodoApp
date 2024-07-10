/* eslint-disable prettier/prettier */

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {ActivityIndicator, Image, Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { useTranslation } from '../../shared/translations/Translations';
import notifee from '@notifee/react-native';
import { Button as ButtonComp } from '../../components/ui/Button'
import { Text as TextComp } from '../../components/ui/Text'
import { styles } from './HomeScreen.styles';
import useAuthentication from '../../shared/authentication/hooks/useAuthentication';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import BaseLayout from '../../components/layout/baseLayout/BaseLayout';
import ButtonContainer from '../../components/ui/ButtonContainer';
import ProgressCard from '../../components/progressCard/ProgressCard';
import PhotoInfoCard from '../../components/photoInfoCard/PhotoInfoCard';
import RNFS from 'react-native-fs';
import TodoScreenApi from '../todo/TodoScreenApi';

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
  const [lang, setLang] = useState<string[]>([]);
  const langDropdownRef = useRef();
  const [photos, setPhotos] = useState(0)

  const [progress, setProgress] = useState(0);
  const [todosCompleted, setTodosCompleted] = useState(false);
  const [todos, setTodos] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectLang = (index: number) => {
    setIsEnabled((previousState) => !previousState);
    const changel = index === 1 ? 'pt' : 'en';
    changeLanguage(changel);
  } 

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
            const data = await TodoScreenApi.getMyTodos(user); 
            console.log('Data: ', data.length)
            const dataCompleted = await TodoScreenApi.getMyTodosCompleted(user);
            console.log('DataCompleted: ', dataCompleted.length)
            setTodos(data)
            setTodosCompleted(dataCompleted)
            const percent = Number(dataCompleted.length) / Number(data.length);
            console.log('Percent: ', percent)
            setProgress(percent)
            setPhotos(0);
            RNFS.readDir("file:///data/data/com.awesomeproject/cache/")
            .then((result) => {
                result.forEach((item) =>{
                const format = item.path.slice(-4);
                if(format === '.jpg' ){
                    setPhotos(prev => prev+1)
                }
                })
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
            setLoading(false)
      };
      setLoading(true)
      fetchData();
      setTimeout(() => {
        if(langDropdownRef.current) {
          langDropdownRef.current.selectIndex(language === 'en' ? 0 : 1);
        }
      }, 100);
      
      return () => {
        console.log('Screen unfocused');
      };
    }, [])
  );


  useEffect(() => {
    const langArray: string[] = [require('../../images/england.png'), require('../../images/portugal.png')];
    setLang(langArray)

    setTimeout(() => {
      if(langDropdownRef.current) {
        langDropdownRef.current.selectIndex(language === 'en' ? 0 : 1);
      }
    }, 100);
  }, [])

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
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (<Image style={{marginRight: 10}} source={require('../../images/home.png')} />),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <>
          <View style={{ paddingRight: 10 }}>
            <TextComp size='md'>{T.home_screen.welcome} {user?.username}!</TextComp>
          </View>
          <View><ButtonComp title='Logout' size='sm' onPress={redirect} /></View>
        </>
        
      ),
      
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav, isEnabled]);

  if(loading)
    return <ActivityIndicator />

  return(
    <BaseLayout>
        <View style={styles.container}>
          <ButtonContainer>
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
          <View style={styles.selectcontainer}>
            <View style={{width:70, height: 50 }}>
              <SelectDropdown
                ref={langDropdownRef}
                data={lang}
                //defaultValueByIndex={1}
                onSelect={(selectedItem, index) => {
                  selectLang(index);
                }}
                renderButton={(l) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Image source={l} />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && {backgroundColor: 'white'}),
                      }}>
                      <Image source={item} />
                    </View>
                  );
                }}
                dropdownStyle={styles.dropdownMenuStyle}

              />
            </View>
          </View>
           
          </ButtonContainer>
          <View style={{height:40}} />
          <ProgressCard progress={progress} todosCompleted={todosCompleted} todos={todos} />
          <View style={{height:40}} />
          <PhotoInfoCard photo={photos} />
      
      
      {/*<View style={{marginTop: 150, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.card} onPress={() => setOpenModal(val => !val)}>
          <Image source={require('../../images/guide.png')} />
        </TouchableOpacity>
      </View>*/}
      
      {openModal && (
        <Modal 
          transparent={false}
          animationType="slide"
          visible={openModal}
          onRequestClose={() => setOpenModal(val => !val)}
        >
          <ScrollView style={{padding: 10}}>
            <Text style={styles.title_guide}>React Native CLI</Text>
            <Text style={styles.title_guide}>React-navigation</Text>
            <Text style={styles.title_guide}>Resouge react-form </Text>
            <Text style={styles.title_guide}>Resouge react-translations</Text>
            <Text style={styles.title_guide}>Resouge react-schema</Text>
            <Text style={styles.title_guide}>React-native-camera-kit</Text>
            <Text style={styles.title_guide}>React-native-fs</Text>
            <Text style={styles.title_guide}>Notifee</Text>
            <Text style={styles.title_guide}>Op-SQLite</Text>
            <Text style={styles.title_guide}>Drizzle ORM</Text>
            <Text style={styles.title_guide}>React-native-bootsplash</Text>
            <Text style={styles.title_guide}>React-native-fast-image</Text>
            <Text style={styles.title_guide}>React-native-image-viewing</Text>

          </ScrollView>
          
          <View style={styles.row}>
              <View style={styles.buttonContainerCancel}>
                  <ButtonComp title="Close" onPress={() => setOpenModal(val => !val)} />
              </View>
          </View>

        </Modal>
      )}

      </View>
    
    </BaseLayout>

   
  )
};



export default HomeScreen;
