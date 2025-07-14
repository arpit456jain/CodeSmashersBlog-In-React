
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import config from "./config/config"
import {Header,Footer} from "./components/index"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
function App() {
  const[loading,setLoading] = useState(true);
  const dispath = useDispatch();
  useEffect(()=>{
    const user = authService.getCurrentUser();
    console.log("user",user)
  },[])

  return (
    <>
    <Header/>
    CodeSmashers Blog
    <Footer/>
    </>
  );
}

export default App;
