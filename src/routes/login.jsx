import { SignIn } from '@clerk/clerk-react';
import React from 'react'
import { useTitle } from '../utils';

const Login = () => {

  useTitle("Login")

  return (
    <div className='flex h-screen'>
        <div className='flex flex-1 items-center justify-center'>
            <SignIn path='/login' signUpUrl='/signup' routing='path' />
        </div>
        <div className='flex flex-1 items-center justify-center'>
            Add your design here
        </div>
    </div>
  )
}

export default Login;
