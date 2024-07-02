/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { AuthenticationUser } from '../Authentication';
import { useAuthenticationContext } from '../../context/UserContext';

const useAuthentication = () => {
  const { user, setUser } = useAuthenticationContext();



  const login = async (username: string, password: string) => {
    const newUser: AuthenticationUser = new AuthenticationUser(username, password);
    setUser(newUser); 
  };

  const logout = () => {
    setUser(undefined);
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
};

export default useAuthentication;
