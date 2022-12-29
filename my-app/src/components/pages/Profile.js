import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { IoPersonOutline } from 'react-icons/io5';

export default function Profile(props) {
  const [isAuth, login, logout] = useContext(UserContext);
  const [data, setData] = useState(null);

  return (
    <>
      <div className="profile">
        <h1>
          <IoPersonOutline /> Welcome, {localStorage.getItem('user')}!
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
