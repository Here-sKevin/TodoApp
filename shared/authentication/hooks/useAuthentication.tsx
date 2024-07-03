/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { AuthenticationUser } from '../Authentication';
import { useAuthenticationContext } from '../../context/UserContext';

const useAuthentication = () => {
  const { user, setUser } = useAuthenticationContext();



  const login = async (username: string, password: string, id: number) => {
    const newUser: AuthenticationUser = new AuthenticationUser(username, password, id);
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
