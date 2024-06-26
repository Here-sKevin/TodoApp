import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './pages/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoScreen from './pages/TodoScreen';
import PhotoScreen from './pages/PhotoScreen';
import Translations from './Translations';
import { UserProvider } from './context/UserContext';
import useAuthentication from './shared/hooks/useAuthentication';
import SignUpScreen from './pages/SignUpScreen';
import SignInScreen from './pages/SignInScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNav = () => {
  const { isAuthenticated, user } = useAuthentication();
  console.log('isAuth: ', isAuthenticated);
  console.log('User: ', user);
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
          <Stack.Screen name="Photo" component={PhotoScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <Translations>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="Tab"
              component={StackNav}
              options={{ title: 'Home' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Translations>
    </UserProvider>
  );
};

export default App;
