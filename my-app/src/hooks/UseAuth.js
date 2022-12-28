import { useState } from 'react';

export default function useAuth(initialValue) {
  const [isAuth, setIsAuth] = useState(initialValue);

  const [count, setCount] = useState(0);

  function login() {
    console.log('useAuth function login');
    setIsAuth(true);
    window.localStorage.setItem('loggedIn', true);
  }

  function logout() {
    console.log('function logout');
    setIsAuth(false);
    window.localStorage.setItem('loggedIn', false);
  }

  return [isAuth, login, logout];
}
