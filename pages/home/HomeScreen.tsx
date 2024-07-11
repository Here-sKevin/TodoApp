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
import TaskInfoCard from '../../components/taskInfoCard/TaskInfoCard';
import PhotoInfoCard from '../../components/photoInfoCard/PhotoInfoCard';
import RNFS from 'react-native-fs';
import TodoScreenApi from '../todo/TodoScreenApi';
import UserHeader from '../../components/userHeader/UserHeader';

type Props = {
  navigation: {
    navigate: Function;
  };
};

type ImageType = {
  uri: string
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const { T, changeLanguage, language } = useTranslation();
  const {logout, user} = useAuthentication();
  const [lang, setLang] = useState<string[]>([]);
  const langDropdownRef = useRef();
  const [photos, setPhotos] = useState<ImageType[]>([])
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectLang = (index: number) => {
    const changel = index === 1 ? 'pt' : 'en';
    changeLanguage(changel);
  } 

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
            const data = await TodoScreenApi.getMyTodos(user); 
            console.log('Data: ', data.length)
            setTodos(data)
            setPhotos([]);
            RNFS.readDir("file:///data/data/com.awesomeproject/cache/")
            .then((result) => {
                result.forEach((item) =>{
                const format = item.path.slice(-4);
                if(format === '.jpg' ){
                  const tdata = 'file://'+item.path;
                  setPhotos(prev => [...prev, tdata])
                }
                })
            })
            .catch((err) => {
                console.log(err.message, err.code);
            })
            .finally(() => {
              setLoading(false);
            });
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

  if(loading)
    return <ActivityIndicator />

  return(
    <BaseLayout>
        <View style={styles.container}>
          <UserHeader username={user?.username} onDisplayNotification={() => onDisplayNotification()} />
          <ButtonContainer>
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
          <TaskInfoCard todos={todos} goTodo={() => navigation.navigate('Todo')} />
          <View style={{height:40}} />
          <PhotoInfoCard photo={photos} goPhoto={() => navigation.navigate('Photo')}/>
        </View>
    </BaseLayout>
  )
};



export default HomeScreen;
