import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import Oauth from '../components/Oauth'

const SignIn = () => {
  const [show, setIsShow] = useState(false)
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const HandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value

    })
  }
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const { data } = await axios({
        method: 'post',
        url: '/api/v1/users/signin',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(formData)
      });

      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (error) {
      console.log(error)
      dispatch(signInFailure(error?.response?.data.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In </h1>
      <form onSubmit={HandleSubmit} className='flex flex-col gap-4  '>

        <input type="email" placeholder='email' id='email' onChange={HandleChange} className='border p-3 rounded-lg' />
        <div className='flex relative'>
          <input type={show ? 'text' : 'password'} id='password' placeholder='password' onChange={HandleChange} className='border p-3 rounded-lg w-full' />
          <input type='checkbox' className='w-[20px] h-[20px] absolute right-4 top-4 rounded-lg cursor-pointer' onClick={() => setIsShow(!show)} />
        </div>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading' : 'Sign in'}</button>
        <Oauth />

      </form>
      <div className='flex gap-2 mt-5 '>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn
