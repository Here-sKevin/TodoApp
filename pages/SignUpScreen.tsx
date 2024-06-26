/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import useAuthentication from '../shared/hooks/useAuthentication';
import { useRegisterModel } from '../models/RegisterModel';


type NavigationProps = {
  navigation: {
    navigate: Function;
  };
};
const SignUpScreen: React.FC<NavigationProps> = ({navigation}) => {

  const {signUp} = useAuthentication();

  const {
  field,
  handleSubmit,

} = useRegisterModel();

  const onSubmit = handleSubmit(async (data) => {
  await signUp(data.username, data.password);
  navigation.navigate('SignIn');
});
return (
  <>
    <View>
      <Button
        title="Go to SignIn"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
    
    <View style={styles.container}>      
      <TextInput style={styles.input} placeholder='Username' /*onChange={(e) => field('username').onChange(e.nativeEvent.text)}*/ onChangeText={(e) => field('username').onChange(e)} />
      <TextInput style={styles.input} placeholder='Password' onChangeText={(e) => field('password').onChange(e)}/>
      <Button title='Register' onPress={() => onSubmit()}/>
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

export default SignUpScreen;
  