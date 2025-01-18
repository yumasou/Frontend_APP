import React from 'react'

function Login() {
  return (
    <div className='w-4/5 sm:w-2/6 mx-auto'>
        <div className='py-12'>
        <h3 className='text-center text-5xl font-bold my-16'>Login</h3>
        <form className='flex flex-col space-y-10 '>
            <input type="text" placeholder='username' className='w-full border rounded-lg leading-9  placeholder:text-slate-500 px-5' />
            <input type="password" placeholder='password' className='w-full border rounded-lg leading-9  placeholder:text-slate-500 px-5' />
            <button className='w-full rounded-lg leading-9 bg-green-500'>Login</button>
        </form>
        </div>
    </div>
  )
}

export default Login