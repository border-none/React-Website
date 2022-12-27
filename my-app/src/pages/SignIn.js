import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/UseAuth';

export default function SignIn() {
  const [isAuth, login, logout] = useAuth(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userInfo, setUserInfo] = useState();

  const onSubmit = (data) => {
    setUserInfo(data);
    console.log(data);
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
        <button onClick={login}>SIGN IN</button>
      </form>
      <div className="errors">
        <p>{errors.user?.message}</p>
        <p>{errors.password?.message}</p>
      </div>
    </div>
  );
}

// ref = { register };
