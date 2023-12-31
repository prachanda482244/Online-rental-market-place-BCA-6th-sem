import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Oauth from '../components/Oauth'

const SignUp = () => {
  const [show, setIsShow] = useState(false)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const HandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios({
        method: 'post',
        url: '/api/v1/users/signup',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(formData)
      });
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false)
        return
      }
      setLoading(false)
      setError(null)
      navigate("/sign-in")
    } catch (error) {
      setLoading(false)
      setError("Some error occured")
      console.error('Error submitting form:', error);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up </h1>
      <form onSubmit={HandleSubmit} className='flex flex-col gap-4  '>
        <input type="text" placeholder='username' id='username' onChange={HandleChange} className='border p-3 rounded-lg' />
        <input type="email" placeholder='email' id='email' onChange={HandleChange} className='border p-3 rounded-lg' />
        <div className='flex relative'>
          <input type={show ? 'text' : 'password'} id='password' placeholder='password' onChange={HandleChange} className='border p-3 rounded-lg w-full' />
          <input type='checkbox' className='w-[20px] h-[20px] absolute right-4 top-4 rounded-lg cursor-pointer' onClick={() => setIsShow(!show)} />
        </div>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading' : 'Sign up'}</button>
        <Oauth />
      </form>
      <div className='flex gap-2 mt-5 '>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp
