import React from 'react';
import { useState } from 'react';
import { showErrMessage, showSuccessMessage} from '../../../utilities/notification'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useEffect } from 'react';

const initialState ={
    title: '',
    desc: '',
    status:'',
    err: '' ,
    success: ''
}

export const Edit = () => {
    const history = useNavigate()
    const token = useSelector(state =>state.token)
    const [task, setTask] = useState({})

    const  {id} = useParams()

    useEffect (()=>  {
        const getTask = async() =>{
            const res = await axios.get(`/user/task/${id}`,{
                headers: {Authorization: token}
            })
            setTask(res.data)
        }
        getTask()   
    }, [id, token] )

    const [data, setData] = useState(initialState)
    const {title, desc, err, success} =data

    const handleInput =  (e) => {
        const {name, value} =e.target
        setData({...data, [name]:value, err:'',success: ''})
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.patch(`/user/update/${id}`,{
                title: title ? title : task.title,
                desc: desc ? desc: task.desc
            }, {
                headers: {Authorization: token}
            })
            setData({...data, err: '', success: res.data.msg})
    
    
            history('/dashbaord')
    
        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    
    
  return <div className='max-w-sm mx-auto pt-8'>
      
      
      <form onSubmit={handleSubmit} >
      {err && showErrMessage(err)}
      {success && showSuccessMessage(success)}
          <div className='flex flex-col gap-2 w-3/4 pb-4'>
              <label htmlFor='title'>Title</label>
              <input type="text" id='title' defaultValue={task.title} name='title' placeholder=' Title' onChange={handleInput} className='p-2 text-black rounded'/>
          </div>
          <div className='flex flex-col gap-2 w-3/4 pb-4'>
              <label htmlFor='desc'>Description</label>
              <input type="desc" id='desc' name='desc' defaultValue={task.desc}  placeholder='Description' onChange={handleInput} className='p-2 text-black rounded' rows="4" cols="50"/>
          </div>
          

          <div className='flex justify-end w-3/4'>
              <button type="submit" className='px-6 py-1 bg-white text-black'>Update</button>
          </div>
          
      </form>
  </div>;
};
