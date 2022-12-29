import { Route, Routes } from 'react-router-dom';
import './App.css';
import useAuth from './hooks/UseAuth';
import Navbar from './components/Navbar';
import Favorites from './components/pages/Favorites';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import SignUp from './components/pages/SignUp';
import LogIn from './components/pages/LogIn';
import { UserContext } from './components/UserContext';
import {
  IoHeartOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoLogInOutline,
} from 'react-icons/io5';
import Pokemon from './components/pages/Pokemon';
import { useState } from 'react';

function App() {
  const [isAuth, login, logout] = useAuth(false);
  const [count, setCount] = useState(0);

  if (
    window.localStorage.getItem('loggedIn') === 'true' &&
    window.localStorage.getItem('loggedInTimes') === '0'
  ) {
    console.log('LOGIN from app');
    // console.log(isAuth, 'isAuth is set to true');
  }

  // console.log(window.localStorage.getItem('loggedInTimes') === '1');

  const heartIcon = (
    <div>
      <IoHeartOutline /> FAVORITES
    </div>
  );
  const personIcon = (
    <div>
      <IoPersonOutline /> {localStorage.getItem('user')?.toUpperCase()}
    </div>
  );

  return (
    <>
      <Navbar
        main={isAuth ? heartIcon : 'SIGN UP'}
        secondary={
          isAuth && localStorage.getItem('user') ? personIcon : 'SIGN IN'
        }
      />
      <UserContext.Provider value={[isAuth, login, logout, count, setCount]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={isAuth ? <Profile /> : <LogIn />} />
          <Route path="/signin" element={isAuth ? <Favorites /> : <SignUp />} />
          <Route path="/pokemon" element={<Pokemon />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
