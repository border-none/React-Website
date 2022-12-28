import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { IoHeartOutline, IoHomeOutline } from 'react-icons/io5';

export default function Profile(props) {
  const [isAuth, login, logout] = useContext(UserContext);

  return (
    <>
      <div className="profile">
        <h1>
          {IoHomeOutline()} Welcome, {localStorage.getItem('user')}!
        </h1>
        <button onClick={logout}>SIGN OUT</button>
        <div className="delete--container">
          <h3>DELETE ACCOUNT</h3>
          <p>(CLEARS LOCAL STORAGE)</p>
          <button
            className="delete--btn"
            onClick={() => {
              logout();
              localStorage.clear();
            }}
          >
            DELETE ACCOUNT
          </button>
        </div>
      </div>
    </>
  );
}
