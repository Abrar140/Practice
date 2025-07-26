import React ,{useContext}from 'react'
import {LoginContext} from '../Context/LoginContext'

function ContextProfile() {
    const {username}=useContext(LoginContext)

  return (
    <div>ContextProfile
        <h2> username:{username}</h2>
    </div>
  )
}

export default ContextProfile