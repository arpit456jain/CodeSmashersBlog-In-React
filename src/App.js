
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import config from "./config/config"
import {Header,Footer} from "./components/index"
import {useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from "./authSlice"

function App() {
  const[loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((data)=>{
      console.log("iside get curent data",data);
      if(data)
        dispatch(login({data}))
      else
        dispatch(logout())
    }).catch((error)=>{
      dispatch(logout())
    }).finally(()=>{
      setLoading(false);
    })
    // console.log("user",user)
  },[])

  return (
    <>
     
        { !loading ? <div className='min-h-screen flex flex-wrap bg-gray-400'>
          <div className='w-full block'>
            <Header/>
            <main>
            <Outlet />
            </main>
            <Footer/>
          </div>
        </div>: "loding..."}
   
    </>
  );
}

export default App;
