import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { useTranslation } from '../../shared/translations/Translations';
import notifee from '@notifee/react-native';
import { Text as TextComp } from '../../components/ui/Text';
import { styles } from './HomeScreen.styles';
import useAuthentication from '../../shared/authentication/hooks/useAuthentication';
import { useFocusEffect } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import BaseLayout from '../../components/layout/baseLayout/BaseLayout';
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
  uri: string;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { changeLanguage, language } = useTranslation();
  const { user } = useAuthentication();
  const [lang, setLang] = useState<string[]>([]);
  const langDropdownRef = useRef();
  const [photos, setPhotos] = useState<ImageType[]>([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectLang = (index: number) => {
    const changel = index === 1 ? 'pt' : 'en';
    changeLanguage(changel);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await TodoScreenApi.getMyTodos(user);
        setTodos(data);
        setPhotos([]);
        RNFS.readDir('file:///data/data/com.awesomeproject/cache/')
          .then((result) => {
            result.forEach((item) => {
              const format = item.path.slice(-4);
              if (format === '.jpg') {
                const tdata = 'file://' + item.path;
                setPhotos((prev) => [...prev, tdata]);
              }
            });
          })
          .catch((err) => {
            console.log(err.message, err.code);
          })
          .finally(() => {
            setLoading(false);
          });
      };
      setLoading(true);
      fetchData();
      setTimeout(() => {
        if (langDropdownRef.current) {
          langDropdownRef.current.selectIndex(language === 'en' ? 0 : 1);
        }
      }, 200);

      return () => {};
    }, []),
  );

  useEffect(() => {
    //const langArray: string[] = [require('../../images/england.png'), require('../../images/portugal.png')];
    const langArray: string[] = ['en', 'pt'];
    setLang(langArray);

    setTimeout(() => {
      if (langDropdownRef.current) {
        langDropdownRef.current.selectIndex(language === 'en' ? 0 : 1);
      }
    }, 100);
  }, []);

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
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="lightgreen" />
      </View>
    );
  }

  return (
    <BaseLayout camera={false}>
      <UserHeader
        username={user?.username}
        onDisplayNotification={() => onDisplayNotification()}
      />
      <TaskInfoCard todos={todos} goTodo={() => navigation.navigate('Todo')} />
      <PhotoInfoCard
        photo={photos}
        goPhoto={() => navigation.navigate('Photo')}
      />
      <View style={styles.stickyFooter}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 40,
          }}
        >
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
                  <TextComp fontWeight="bold">{l}</TextComp>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: 'white' }),
                  }}
                >
                  <TextComp fontWeight="bold">{item}</TextComp>
                </View>
              );
            }}
            dropdownStyle={styles.dropdownMenuStyle}
          />
          <TouchableOpacity
            style={styles.notification}
            onPress={() => onDisplayNotification()}
          >
            <Image
              source={require('../../images/notification.png')}
              style={styles.notificationImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
};

export default HomeScreen;
