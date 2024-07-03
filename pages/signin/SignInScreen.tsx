/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, TextInput, View} from 'react-native';
import { useLoginModel } from './interface/LoginModel';
import { Button as ButtonComp } from '../../components/ui/Button'
import { styles } from './SignInScreen.styles';
import useAuthentication from '../../shared/authentication/hooks/useAuthentication';
import SignInScreenApi from './SignInScreenApi';
import FormControl from '../../components/ui/FormControl';

type NavigationProps = {
  navigation: {
    navigate: Function;
  };
};
const keyIcon = require('../../images/key.png');
const SignInScreen: React.FC<NavigationProps> = ({navigation}) => {
  const {login} = useAuthentication();
    const {
		field,
		handleSubmit,
    getErrors
	} = useLoginModel();

  const onSubmit = handleSubmit(async (data) => {
      const u = await SignInScreenApi.signIn(data);
      if(Object.entries(u).length > 0)
        login(data.username, data.password, u[0].id)
	});
  return (
    <>
      <View style={styles.container}>    
        <View style={styles.wrapper}>
          <View style={styles.image}>
            <Image source={keyIcon} />
          </View>
          <FormControl errors={getErrors('username')}>
            <TextInput style={styles.input} placeholder='Username' onChangeText={(e) => field('username').onChange(e)} />
          </FormControl>
          <FormControl errors={getErrors('password')}>
            <TextInput style={styles.input} placeholder='Password' secureTextEntry onChangeText={(e) => field('password').onChange(e)} />
          </FormControl>
          

        </View> 
        <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <ButtonComp
                title="Go to SignUp"
                variant='outline'
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonComp title='Login' size='md' onPress={() => onSubmit()}/>
            </View>
          </View>       
      </View>     
    </>
  );
};

export default SignInScreen;
  