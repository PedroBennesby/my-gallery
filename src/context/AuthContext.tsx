import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

type authContextType = {
  user: {};
  isLogged: boolean;
  login: () => void;
  logout: () => void;
};

type Props = {
  children: ReactNode;
};

const authContextDefaultValues: authContextType = {
  user: {},
  isLogged: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  useEffect(() => {
    onAuthStateChanged(auth, (isLogged) => {
      if (isLogged) {
        const uid = isLogged.uid;
        console.log({ uid });
      } else {
        console.log('no user');
      }
    });
  }, []);
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState({});
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const userResult = result.user;
        setUser(userResult);
        console.log({ credential, token, user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };
  const logout = () => {
    auth.signOut();
    console.log('logout');
  };
  const value = { user, login, logout, isLogged: !!user };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
