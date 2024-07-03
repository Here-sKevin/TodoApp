/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { Button as ButtonComp } from '../../components/ui/Button'
import { request, PERMISSIONS } from 'react-native-permissions';

import React, { useEffect, useState } from 'react';
import { styles } from './PhotoScreen.styles';
import { useTranslation } from '../../shared/translations/Translations';
const PhotoScreen: React.FC = () => {
  const navigation = useNavigation();
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [capture, setCapture] = useState<any>([])
  const [photos, setPhotos] = useState([]);
  const {T} = useTranslation()


  const onBottomButtonPressed = (ev: any) => {
    console.log('ev: ', ev)
    console.log('images: ', ev.captureImages)
    if(ev.type === 'left') {
      setCameraOpen(false);
    }
    if(ev.type === 'capture') {
      console.log('Enter capture')
      console.log('path: ', ev.captureImages.path)
    }
  }



  return (
    <>
                <View>
                  <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                      <ButtonComp  title={cameraOpen ? T.photo_screen.buttonClose : T.photo_screen.buttonOpen}
                        onPress={() => setCameraOpen(!cameraOpen)} />
                    </View>
                  </View>
        
                  </View>
      <View style={{flex: 1}}>
        {cameraOpen && (
          <CameraScreen
            actions={{ leftButtonText: 'Cancel', rightButtonText: 'Done' }}
            onBottomButtonPressed={(event) => onBottomButtonPressed(event)}
            captureButtonImage={require('../../images/capture.png')} // optional, image capture button
            showCapturedImageCount={true}
            /*flashImages={{
              // optional, images for flash state
              on: require('path/to/image'),
              off: require('path/to/image'),
              auto: require('path/to/image'),
            }}
            cameraFlipImage={require('path/to/image')} // optional, image for flipping camera button
            captureButtonImage={require('path/to/image')} // optional, image capture button
            torchOnImage={require('path/to/image')} // optional, image for toggling on flash light
            torchOffImage={require('path/to/image')} // optional, image for toggling off flash light
            hideControls={false} // (default false) optional, hides camera controls
            showCapturedImageCount={false} // (default false) optional, show count for photos taken during that capture session*/
          />
        )}

        <View>
          {photos.map((photoUri, index) => (
            <Image
              key={index}
              source={{ uri: photoUri }}
            />
          ))}
        </View>
        
      </View>
    </>
  );
};

export default PhotoScreen;
