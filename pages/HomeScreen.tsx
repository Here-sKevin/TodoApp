/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, Text, View} from 'react-native';
import { useTranslation } from '../shared/Translations';
import useAuthentication from '../shared/hooks/useAuthentication';

type Props = {
  navigation: {
    navigate: Function;
  };
};
const HomeScreen: React.FC<Props> = ({navigation}) => {
  const { T } = useTranslation();
  const {logout, user} = useAuthentication();

  const redirect = () => {
    logout(user?.username)
    //navigation.navigate('SignIn')
  }

  return (
    <>
      <View>
        <Button title='Logout' onPress={redirect} />
        <Button
          title="Go to Todo"
          onPress={() => navigation.navigate('Todo')}
        />
        <Button
          title="Go to Photo"
          onPress={() => navigation.navigate('Photo')}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{T.home_screen.welcome} {user?.username}</Text>
      </View>
    </>
  );
};

export default HomeScreen;
