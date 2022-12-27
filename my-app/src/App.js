import { Route, Routes } from 'react-router-dom';
import './App.css';
import useAuth from './hooks/UseAuth';
import Navbar from './components/Navbar';
import Favorites from './components/pages/Favorites';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';

function App() {
  const [isAuth, login, logout] = useAuth(false);

  return (
    <>
      <button onClick={login}>LOG IN</button>
      <button onClick={logout}>LOG OUT</button>
      <Navbar
        main={isAuth ? 'FAVORITES' : 'SIGN IN'}
        secondary={isAuth ? 'PROFILE' : 'SIGN UP'}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={isAuth ? <Favorites /> : <SignIn />} />
        <Route path="/signup" element={isAuth ? <Profile /> : <SignUp />} />
      </Routes>
    </>
  );
}

export default App;
