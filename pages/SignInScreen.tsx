/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import useAuthentication from '../shared/hooks/useAuthentication';
import { useLoginModel } from '../models/LoginModel';
import {Input as InputComp} from '../components/ui/Input';
import { Button as ButtonComp } from '../components/ui/Button'


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
      <View style={styles.container}>      
        <TextInput style={styles.input} placeholder='Username' onChangeText={(e) => field('username').onChange(e)} />
        <TextInput style={styles.input} placeholder='Password' secureTextEntry onChangeText={(e) => field('password').onChange(e)} />
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
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: 10,
    },
    buttonContainer: {
      flex: 1,
      margin: 10,
    },
  });

export default SignInScreen;
  