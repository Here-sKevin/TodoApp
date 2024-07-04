/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {ActivityIndicator, FlatList, TouchableOpacity, View} from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { Button as ButtonComp } from '../../components/ui/Button'
import RNFS from 'react-native-fs';
import ImageView from "react-native-image-viewing";

import React, { useEffect, useState } from 'react';
import { styles } from './PhotoScreen.styles';
import { useTranslation } from '../../shared/translations/Translations';
import FastImage from 'react-native-fast-image';

type ImageType = {
  uri: string
}

const PhotoScreen: React.FC = () => {
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [visible, setIsVisible] = useState<boolean>(false);
  const [currentImageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const {T} = useTranslation()

  const onBottomButtonPressed = (ev: any) => {
    if(ev.type === 'left') {
      setCameraOpen(false);
    }
    if(ev.type === 'capture') {
      captureImage();
      console.log('Enter capture')
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
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }

  const SelectImage = (index: number) =>{
    console.log('Image Index: ', index)
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

  if(loading) {
    return(
      <View>
        <ActivityIndicator style={{alignItems: "center", justifyContent: "center"}} size="large" />
      </View>
    )
  }

  return (
    <>

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
          <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                      <ButtonComp  title={cameraOpen ? T.photo_screen.buttonClose : T.photo_screen.buttonOpen}
                        onPress={() => setCameraOpen(!cameraOpen)} />
                    </View>
                  </View>
            <ImageView
              images={images}
              imageIndex={currentImageIndex}
              visible={visible}
              onRequestClose={() => setIsVisible(false)} 
            />
            <FlatList
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
              style={styles.imageContainer}
            />
            </>
        )}
        
      </View>
    </>
  );
};

export default PhotoScreen;
