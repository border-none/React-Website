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
import { IoHeartOutline, IoHomeOutline } from 'react-icons/io5';
import Pokemon from './components/pages/Pokemon';

function App() {
  const [isAuth, login, logout] = useAuth(false);
  // const [user, setUser] = useState(null);

  // const value = useMemo(() => [user, setUser], [user, setUser]);

  // const username = (localStorage.getItem('username') ? localStorage.getItem('username'): )

  const heart = <div>{IoHeartOutline()} FAVORITES</div>;
  const house = (
    <div>
      {IoHomeOutline()} {localStorage.getItem('user')?.toUpperCase()}
    </div>
  );

  return (
    <>
      <UserContext.Provider value={[isAuth, login, logout]}>
        <Navbar
          main={isAuth ? heart : 'SIGN UP'}
          secondary={isAuth && localStorage.getItem('user') ? house : 'SIGN IN'}
        />
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
