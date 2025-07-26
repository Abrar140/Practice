import React from 'react'

function Homepage() {
const handleSubmit= async()=>{

    const res= await fetch("http://localhost:5000/",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
 const resdata=res.json();
 console.log(" i am res data"+  JSON.stringify(resdata))
}

  return (
    <div>Homepage
        <button onClick={handleSubmit}> Plz click me</button>
    </div>
  )
}

export default Homepage