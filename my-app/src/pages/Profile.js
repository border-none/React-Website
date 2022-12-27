import useAuth from '../hooks/UseAuth';

export default function Profile(props) {
  const [auth, setAuth] = useAuth(true);
  function signOut() {
    setAuth(false);
    console.log(auth);
  }

  return (
    <>
      <h1>PROFILE</h1>
      <button onClick={signOut}>SIGN OUT</button>
    </>
  );
}
