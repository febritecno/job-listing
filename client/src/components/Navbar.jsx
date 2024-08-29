import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setLogout } from '../reduxStore/authSlice';

const Navbar = () => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(
      setLogout()
    )
    navigate('/');
  }

  return (
    <div className='sticky top-0 flex items-center justify-between bg-white p-4 z-[100] w-full backdrop-blur-sm'>
      <Link to='/'>
        <h1 className='text-3xl font-bold cursor-pointer text-amber-600'>Job List</h1>
      </Link>
      <div>
        {
          token ? <button onClick={handleLogout} className='px-6 py-2 text-white rounded cursor-pointer bg-amber-600'>Logout</button> : <div>
            <Link to='/login'>
              <button className='pr-4 text-amber-600'>Sign In</button>
            </Link>
            <Link to='/signup'>
              <button className='px-6 py-2 text-white rounded cursor-pointer bg-amber-600'>Sign Up</button>
            </Link>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar