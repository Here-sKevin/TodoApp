/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import useAuthentication from '../shared/hooks/useAuthentication';
import { useLoginModel } from '../models/LoginModel';


type NavigationProps = {
  navigation: {
    navigate: Function;
  };
};


const SignInScreen: React.FC<NavigationProps> = ({navigation}) => {
    const {login} = useAuthentication();

    const {
		field,
		handleSubmit
	} = useLoginModel();

    const onSubmit = handleSubmit(async (data) => {
		await login(data.username, data.password);
		//navigation.navigate('Home');
	});
  return (
    <>
      <View>
        <Button
          title="Go to SignUp"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
      
      <View style={styles.container}>      
        <TextInput style={styles.input} placeholder='Username' onChangeText={(e) => field('username').onChange(e)} />
        <TextInput style={styles.input} placeholder='Password' onChangeText={(e) => field('password').onChange(e)} />
        <Button title='Login' onPress={() => onSubmit()}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    displayText: {
      fontSize: 18,
    },
  });

export default SignInScreen;
  