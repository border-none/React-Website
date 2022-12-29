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
    } else if (localStorage.length === 0) {
      setUserInfo('Create an account first! 💥');
    } else {
      setUserInfo('Wrong username or password! 💥');
      console.error('Wrong username or password! 💥');
    }
  }

  return (
    <>
      <div className="errors">
        {userInfo && <p>{userInfo}</p>}
        {errors.user?.message && <p>{errors.user?.message}</p>}
        {errors.password?.message && <p>{errors.password?.message}</p>}
      </div>
      <form className="signin" onSubmit={handleSubmit(onSubmit)}>
        <h1>SIGN IN</h1>
        <input
          type="text"
          placeholder="username"
          {...register('user', { required: '💥 Username is required' })}
        />
        <input
          type="password"
          placeholder="password"
          {...register('password', { required: '💥 Password is required' })}
        />
        <button>SIGN IN</button>
      </form>
    </>
  );
}
