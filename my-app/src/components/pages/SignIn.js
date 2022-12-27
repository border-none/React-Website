import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../UserContext';

export default function SignIn() {
  const [isAuth, login, logout] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userInfo, setUserInfo] = useState();

  const onSubmit = (data) => {
    window.localStorage.setItem('user', data.user);
    window.localStorage.setItem('password', data.password);
    console.log(data, 'data from FORM');
    const obj = JSON.stringify(data);
    setUserInfo(data);
    login();
  };

  return (
    <div className="signin">
      <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
      <form onSubmit={handleSubmit(onSubmit)} className="signin--card">
        <h1>WELCOME!</h1>
        <input
          type="text"
          placeholder="username"
          {...register('user', { required: 'Username is required' })}
        />
        <input
          type="password"
          placeholder="password"
          {...register('password', { required: 'Password is required' })}
        />
        <button>SIGN IN</button>
      </form>
      <div className="errors">
        <p>{errors.user?.message}</p>
        <p>{errors.password?.message}</p>
      </div>
    </div>
  );
}

// ref = { register };
