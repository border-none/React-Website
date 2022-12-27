import { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/UseAuth';
import { UserContext } from '../UserContext';

export default function SignUp() {
  const [isAuth, login, logout] = useContext(UserContext);

  return (
    <>
      <h1>CREATE ACCOUNT</h1>
    </>
  );
}
