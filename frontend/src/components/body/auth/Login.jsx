import React, {useState} from 'react';
import axios from 'axios'
import { showErrMessage,showSuccessMessage } from '../../../utilities/notification';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { dispatchLogin } from '../../../redux/actions/authAction';

const initialState = {
    email:'',
    password:'',
    err: '',
    success: ''

}


export const Login = () => {

    const dispatch = useDispatch()
    const history = useNavigate()

    const [user, setuser]=useState(initialState)
    const {email, password,err,success} = user
    const handleInput = (e) => {
        const {name, value} = e.target
        setuser ({...user, [name]:value, err:'',success: ''})
    }

// console.log(user)
const handleSubmit = async e => {
    e.preventDefault()
    try {
        const res = await axios.post('/user/login',{
            email:email.toLocaleLowerCase(),
            password
        })
        setuser({...user, err: '', success: res.data.msg})

        localStorage.setItem('taskLogin',true)

        dispatch (dispatchLogin())
       
        history('/dashbaord')

    } catch (err) {
        err.response.data.msg && setuser({...user, err: err.response.data.msg, success: ''})
    }
}


  return <div className='max-w-sm mx-auto pt-12'>
      <h1 className='text-2xl font-bold tracking-wider pb-8'>Login</h1>

      {err && showErrMessage(err)}
      {success && showSuccessMessage(success)}

      <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 w-3/4 pb-4'>
              <label htmlFor='email'>Email</label>
              <input type="text" id='email' name='email' value={email} onChange={handleInput} placeholder='Email Address' className='p-2 text-black rounded'/>
          </div>
          <div className='flex flex-col gap-2 w-3/4 pb-4'>
              <label htmlFor='password'>Password</label>
              <input type="password" id='password' name='password' value={password} onChange={handleInput} placeholder='Password' className='p-2 text-black rounded'/>
          </div>

          <div className='flex justify-end w-3/4'>
              <button type="submit" className='px-6 py-1 bg-white text-black'>Login</button>
          </div>
      </form>
  </div>;
};
