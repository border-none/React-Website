import { useState } from 'react';

export default function useAuth(initialValue) {
  const [isAuth, setIsAuth] = useState(initialValue);

  function login() {
    setIsAuth(true);
    console.log('logged in');
    console.log(isAuth);
  }

  function logout() {
    setIsAuth(false);
    console.log('logged out');
  }

  return [isAuth, login, logout];
}
