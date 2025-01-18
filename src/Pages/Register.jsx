import React from 'react'

function Register() {
  return (
    <div className='w-4/5 sm:w-2/6 mx-auto'>
        <div className='py-12'>
        <h3 className='text-center font-bold my-16 text-5xl'>Register</h3>
        <form className='flex flex-col space-y-10 '>
        <input type="text" placeholder='name' className='w-full border rounded-lg leading-9  placeholder:text-slate-500 px-5' />
            <input type="text" placeholder='username' className='w-full border rounded-lg leading-9  placeholder:text-slate-500 px-5' />
            <input type="email" placeholder='email' className='w-full border rounded-lg leading-9  placeholder:text-slate-500 px-5' />
            <input type="text" placeholder='bio' className='w-full border rounded-lg leading-9  placeholder:text-slate-500 px-5' />
            <input type="password" placeholder='password' className='w-full border rounded-lg leading-9  placeholder:text-slate-500 px-5' />
            <button className='w-full rounded-lg leading-9 bg-green-500'>Register</button>
        </form>
        </div>
    </div>
  )
}

export default Register