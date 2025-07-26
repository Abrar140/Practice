import React ,{useContext}from 'react'
import {LoginContext} from '../Context/LoginContext'

function ContextLogin() {
  const {setusername , setShowProfile}=useContext(LoginContext)
  return (
    <>ContextLogin
    <input type="text"  onChange={(e)=>{setusername(e.target.value)}}/>
    <input  type="text"/>
    <button onClick={()=>{setShowProfile(true)}}>Login</button>
    </>
  )
}

export default ContextLogin