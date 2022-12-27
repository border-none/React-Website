import { Route, Routes } from 'react-router-dom';
import './App.css';
import useAuth from './hooks/UseAuth';
import Navbar from './Navbar';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

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
