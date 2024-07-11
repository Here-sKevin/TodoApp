/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {ActivityIndicator, FlatList, Image, TouchableOpacity, View} from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { Button as ButtonComp } from '../../components/ui/Button'
import RNFS from 'react-native-fs';
import ImageView from "react-native-image-viewing";

import React, { useEffect, useState } from 'react';
import { styles } from './PhotoScreen.styles';
import { useTranslation } from '../../shared/translations/Translations';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import BaseLayout from '../../components/layout/baseLayout/BaseLayout';
import { Text as TextComp } from '../../components/ui/Text'

type ImageType = {
  uri: string
}

const PhotoScreen: React.FC = () => {
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [visible, setIsVisible] = useState<boolean>(false);
  const [currentImageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const {T} = useTranslation()

  const onBottomButtonPressed = (ev: any) => {
    if(ev.type === 'left') {
      setCameraOpen(false);
    }
    if(ev.type === 'capture') {
      captureImage();
    }
  }

  const captureImage = () => {
    setImages([])
    RNFS.readDir("file:///data/data/com.awesomeproject/cache/")
      .then((result) => {
        result.forEach((item) =>{
          const format = item.path.slice(-4);
          if(format === '.jpg' ){
            setImages(prev => [...prev, {uri: 'file://'+item.path}])
          }
        })
        setLoading(false)
        setIsVisible(false)
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }

  const handleDeletePhoto = async (fileIndex: number) => {
      const  path = images[fileIndex].uri;
      return RNFS.unlink(path)
      .then(async () => {
        await captureImage()
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const SelectImage = (index: number) =>{
    setImageIndex(index)
    setIsVisible(true)
  }
  useEffect(() => {
    setLoading(true)
    setImages([])
    RNFS.readDir("file:///data/data/com.awesomeproject/cache/")
      .then((result) => {
        result.forEach((item) =>{
          const format = item.path.slice(-4);
          if(format === '.jpg' ){
            setImages(prev => [...prev, {uri: 'file://'+item.path}])
          }
        })
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  },[])

  const handleIndexChange = () => {
    setImageIndex(val => val +1)
  }

  if(loading) {
    return(
      <View>
        <ActivityIndicator style={{alignItems: "center", justifyContent: "center"}} size="large" />
      </View>
    )
  }

  return (
    <BaseLayout>

      <View style={{flex: 1}}>
        {cameraOpen && (
          <CameraScreen
            actions={{ leftButtonText: 'Cancel', rightButtonText: 'Done' }}
            onBottomButtonPressed={(event) => onBottomButtonPressed(event)}
            captureButtonImage={require('../../images/capture.png')} // optional, image capture button
            showCapturedImageCount={true}
          />
        )}
        {!cameraOpen && (
          <>
                    <View style={styles.buttonContainer}>
                      <ButtonComp title='<' variant='outline' size='lg' onPress={() => navigation.navigate('Home')}/>
                      <View style={{width:80}} />
                      <TextComp size='xl' fontFam='title' fontWeight='bold'>Gallery</TextComp>
                    </View>
            <ImageView
              images={images}
              imageIndex={currentImageIndex}
              //onImageIndexChange={handleIndexChange}
              visible={visible}
              onRequestClose={() => setIsVisible(false)} 
              FooterComponent={() => (
                <ButtonComp title={T.photo_screen.buttonDelete} rightSlot={<Image source={require('../../images/delete.png')}/>} variant='ghost' onPress={() => handleDeletePhoto(currentImageIndex)} />
              )}
            />
            
            <FlatList
              //contentContainerStyle={{gap: 5, display:'flex'}}
              data={images}
              renderItem={({item, index}) => (
                <View style={styles.imageWrapper}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() =>SelectImage(index)}>
                    <FastImage
                      style={styles.image}
                      source={{ uri: item.uri }}
                      resizeMode={FastImage.resizeMode.cover}
                      
                    />
                  </TouchableOpacity>
                </View>
              )} 
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              //columnWrapperStyle={{}}
              style={styles.imageContainer}
            />
            </>
        )}
        {!cameraOpen && (
          <View style={styles.stickyFooter}>
           <ButtonComp shape='circle' title={T.photo_screen.buttonOpen} onPress={() => setCameraOpen(!cameraOpen)}/>
          </View>
        )}
       
      </View>
    </BaseLayout>
  );
};

export default PhotoScreen;
