/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import useAuthentication from '../shared/hooks/useAuthentication';
import { useRegisterModel } from '../models/RegisterModel';
import { Button as ButtonComp } from '../components/ui/Button'


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
    <View style={styles.container}>      
      <TextInput style={styles.input} placeholder='Username' /*onChange={(e) => field('username').onChange(e.nativeEvent.text)}*/ onChangeText={(e) => field('username').onChange(e)} />
      <TextInput style={styles.input} placeholder='Password' onChangeText={(e) => field('password').onChange(e)}/>
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

export default SignUpScreen;
  