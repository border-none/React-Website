import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../UserContext';

export default function SignUp() {
  const [isAuth, login, logout] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userInfo, setUserInfo] = useState();
  const [created, setCreated] = useState(false);

  const onSubmit = (data) => {
    window.localStorage.setItem('user', data.user);
    window.localStorage.setItem('password', data.password);
    console.log(data, 'data from FORM');
    const obj = JSON.stringify(data);
    setCreated(true);
  };

  if (!created) {
    return (
      <div className="signup">
        <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
        <form onSubmit={handleSubmit(onSubmit)} className="signup--card">
          <h1>CREATE ACCOUNT</h1>
          <input
            type="text"
            placeholder="*username"
            {...register('user', { required: 'Username is required' })}
          />
          <input
            type="password"
            placeholder="*password"
            {...register('password', { required: 'Password is required' })}
          />
          <input
            type="text"
            placeholder="fav pokemon"
            {...register('pokemon')}
          />
          <button>SIGN UP</button>
        </form>
        <div className="errors">
          <p>{errors.user?.message}</p>
          <p>{errors.password?.message}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="signup">
        <h1>🔥 ACCOUNT CREATED! TRY LOGGIN IN! 🔥</h1>
      </div>
    );
  }
}

// ref = { register };
