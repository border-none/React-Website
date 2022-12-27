import { Route, Routes, UNSAFE_RouteContext } from 'react-router-dom';
import './App.css';
import useAuth from './hooks/UseAuth';
import Navbar from './components/Navbar';
import Favorites from './components/pages/Favorites';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import { UserContext } from './components/UserContext';
import { IoHeartOutline, IoHomeOutline } from 'react-icons/io5';

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
          main={isAuth ? heart : 'SIGN IN'}
          secondary={localStorage.getItem('user') ? house : 'SIGN UP'}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={isAuth ? <Favorites /> : <SignIn />} />
          <Route path="/signup" element={isAuth ? <Profile /> : <SignUp />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
