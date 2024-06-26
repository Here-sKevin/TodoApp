/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';

import React from 'react';
const PhotoScreen: React.FC = () => {
  const navigation = useNavigation();


  return (
    <>
      <View>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Photo Screen</Text>
      </View>
    </>
  );
};

export default PhotoScreen;
