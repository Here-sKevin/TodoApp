/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthenticationContext } from '../../context/UserContext';
import { AuthenticationUser } from '../authentication/Authentication';

interface User {
  username: string;
  password: string;
}

/*interface AuthContextType {
  //user: User | null;
  //isAuthenticated: boolean;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  signUp: (username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: (username: string) => void;
}*/

const useAuthentication = () => {
  //const [user, setUser] = useState<User | null>(null);
  //const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { user, setUser } = useAuthenticationContext();

  

  const storeData = async (key: string, value: User | boolean) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  }

  const getData = async (key: string) => {
    try {
      let value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  }

  const removeData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // error reading value
    }
  }

  const signUp = (username: string, password: string) => {
    const newUser: User = {
      username: username,
      password: password
    }; 
    storeData(username, newUser);
  }

  const login = async (username: string, password: string) => {
    console.log("Login")
    const res = await getData(username);
    if(res) {
      const userData = JSON.parse(res) as User;
      if(userData) {
        console.log("Login UserData")
        const newUser: AuthenticationUser = new AuthenticationUser(username, password);
        //setUserContext(newUser);
        setUser(newUser);
        //setIsAuthenticated(true);
        //console.log("Login isAthenticated", isAuthenticated)
      }
    }
      
    
  };

  const logout = (username: string) => {
    setUser(undefined);
    //setIsAuthenticated(false);

    removeData(username);
  };

  useEffect(() => {
    const fetchData = async () => {
      const aux = await getData('asd');
      if(aux) {
        const storedUser = JSON.parse(aux) as User;
        if (storedUser) {
          const newUser: AuthenticationUser = new AuthenticationUser(storedUser.username, storedUser.password);
          setUser(newUser);
          //setIsAuthenticated(true);
        }
      }
      
      
    }
    fetchData();
  }, []); 

  return {
    user,
    isAuthenticated: !!user,
    signUp,
    login,
    logout,
  };
};

export default useAuthentication;
