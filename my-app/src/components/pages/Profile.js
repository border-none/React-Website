import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { IoPersonOutline } from 'react-icons/io5';

export default function Profile(props) {
  const [isAuth, login, logout] = useContext(UserContext);
  const [modal, setModal] = useState(null);

  function show() {
    console.log('show modal');
    setModal(true);
  }

  function hide() {
    console.log('hide modal');
    setModal(false);
  }

  function deleteAccount() {
    console.log('delete acc');
    setModal(false);
    logout();
    localStorage.clear();
  }

  return (
    <>
      <div className="profile">
        {modal && (
          <div className="modal">
            <div className="modal--container">
              <h3>ARE YOU SURE YOU WANT TO PERMANENTLY DELETE YOUR ACCOUNT?</h3>
              <div className="yesno">
                <button className="yes" onClick={deleteAccount}>
                  YES
                </button>
                <button onClick={hide}>CANCEL</button>
              </div>
            </div>
          </div>
        )}
        <h1>
          <IoPersonOutline /> Welcome, {localStorage.getItem('user')}!
        </h1>
        <button onClick={logout}>SIGN OUT</button>
        <div className="delete--container">
          <h3>PERMANENTLY DELETE ACCOUNT</h3>
          <button className="delete--btn" onClick={show}>
            DELETE ACCOUNT
          </button>
        </div>
      </div>
    </>
  );
}
