import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../UserContext';

export default function LogIn() {
  const [isAuth, login, logout] = useContext(UserContext);

  const [userInfo, setUserInfo] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log('Submitted. Recieved input is', data);
    if (
      localStorage.getItem('user') === data.user &&
      localStorage.getItem('password') === data.password
    ) {
      login();
    } else {
      setUserInfo('Wrong username or password! 💥');
      console.error('Wrong username or password! 💥');
    }
  }

  return (
    <>
      <form className="signin" onSubmit={handleSubmit(onSubmit)}>
        <h1>SIGN IN</h1>
        <input type="text" placeholder="username" {...register('user')} />
        <input
          type="password"
          placeholder="password"
          {...register('password')}
        />
        <button>SIGN IN</button>
        <pre>{userInfo}</pre>
        {/* <p>{errors.user?.message}</p> */}
      </form>
    </>
  );
}
