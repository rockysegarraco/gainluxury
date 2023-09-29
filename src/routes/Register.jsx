import { SignUp } from '@clerk/clerk-react';
import React from 'react'

const Register = () => {
  return (
    <div className='flex h-screen'>
        <div className='flex flex-1 items-center justify-center'>
            <SignUp />
        </div>
        <div className='flex flex-1 items-center justify-center'>
            Add your design here
        </div>
    </div>
  )
}

export default Register;
