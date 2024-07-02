/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, TextInput, View} from 'react-native';
import { useRegisterModel } from './interface/RegisterModel';
import { Button as ButtonComp } from '../../components/ui/Button'
import { styles } from './SignUpScreen.styles';
import SignUpScreenApi from './SignUpScreenApi';

const keyIcon = require('../../images/register.png');

type NavigationProps = {
  navigation: {
    navigate: Function;
  };
};
const SignUpScreen: React.FC<NavigationProps> = ({navigation}) => {
  const {
  field,
  handleSubmit,

} = useRegisterModel();

  const onSubmit = handleSubmit(async (data) => {
    const u = await SignUpScreenApi.signUp(data);
    console.log('data Signup: ', u.values())
    if(u) {
      navigation.navigate('SignIn');
    }
  });
return (
  <>
    <View style={styles.container}>  
      <View style={styles.wrapper}>
          <View style={styles.image}>
            <Image source={keyIcon} />
          </View>
          <TextInput style={styles.input} placeholder='Username' /*onChange={(e) => field('username').onChange(e.nativeEvent.text)}*/ onChangeText={(e) => field('username').onChange(e)} />
          <TextInput style={styles.input} placeholder='Password' onChangeText={(e) => field('password').onChange(e)}/>
      </View> 
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
            <ButtonComp
              title="Go to SignIn"
              variant='outline'
              onPress={() => navigation.navigate('SignIn')}
            />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonComp title='Register' onPress={() => onSubmit()}/>
            </View>
          </View>   
    </View>
  </>
);
};

export default SignUpScreen;
  