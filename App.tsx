/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Suspense } from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
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
import { useTheme } from './styles/useTheme';
import { ActivityIndicator, View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNav = () => {
  const { isAuthenticated } = useAuthentication();
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
  const { theme } = useTheme();
  return (
    <Suspense fallback={<>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator />
      </View>
    </>}>
      <ThemeProvider value={theme.navigation}>
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
      </ThemeProvider>
    </Suspense>
    
  );
};

export default App;
