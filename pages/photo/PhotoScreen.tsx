/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { Button as ButtonComp } from '../../components/ui/Button'
import CameraRoll from '@react-native-community/cameraroll';
import { request, PERMISSIONS } from 'react-native-permissions';

import React, { useEffect, useState } from 'react';
import { styles } from './PhotoScreen.styles';
const PhotoScreen: React.FC = () => {
  const navigation = useNavigation();
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [capture, setCapture] = useState<any>([])
  const [photos, setPhotos] = useState([]);


  const onBottomButtonPressed = (ev: any) => {
    console.log('ev: ', ev)
    console.log('images: ', ev.captureImages)
    if(ev.type === 'left') {
      setCameraOpen(false);
    }
    if(ev.type === 'capture') {
      console.log('Enter capture')
      console.log('path: ', ev.captureImages.path)
      CameraRoll.save(ev.captureImages.path, { type: 'photo', album: 'MyApp' });
      setPhotos([ev.captureImages.path, ...photos]);
      setCapture(ev.captureImages)
    }
  }

  useEffect(() => {
    const loadPhotos = async () => {
      try {
       /* if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
          console.log('P Camera: ', granted['android.permission.CAMERA'])
          console.log('P Storage Write: ', granted['android.permission.READ_EXTERNAL_STORAGE'])
          console.log('P Storage Read: ', granted['android.permission.WRITE_EXTERNAL_STORAGE'])
          if (
            granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
            granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
          ) {
            Alert.alert('Android');
            Alert.alert('Permission denied');
            return;
          }
        } else {
          const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
          const photoPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
          const addPhotoPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
          
          if (cameraPermission !== 'granted' || photoPermission !== 'granted' || addPhotoPermission !== 'granted') {
            Alert.alert('IOS');
            Alert.alert('Permission denied');
            return;
          }
        }*/

        const { edges } = await CameraRoll.getPhotos({
          first: 100,
          assetType: 'Photos',
        });
        console.log('edges: ', edges)
        const loadedPhotos: string[] = edges.map(edge => edge.node.image.uri);
        setPhotos(loadedPhotos);
      } catch (error) {
        console.error(error);
      }
    };

    loadPhotos();
  }, []);


  return (
    <>
                <View>
                  <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                      <ButtonComp
                        title="Go to Home"
                        onPress={() => navigation.navigate('Home')}
                      />
                    </View>
                    <View style={styles.buttonContainer}>
                      <ButtonComp  title={cameraOpen ? "Close Camera" : "Open Camera"}
                        onPress={() => setCameraOpen(!cameraOpen)} />
                    </View>
                  </View>
        
                  </View>
      <View style={{flex: 1}}>
        {cameraOpen && (
            /*<Camera
            style={{flex: 1}}
            ref={(ref: any) => (this.camera = ref)}
            cameraType={CameraType.Back}
            flashMode="auto"
            
          />*/
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
