// import React, {useState} from 'react'
// import ContextLogin from './Components/ContextLogin'
// import ContextProfile from './Components/ContextProfile'

// import {LoginContext} from './Context/LoginContext'

// function App() {

//   const [showProfile, setShowProfile] = useState(false)
//   const [username, setusername]=useState("")
//   return (
//     <div className='App'>
//       <LoginContext.Provider value={{username, setusername,setShowProfile}}>
//       {showProfile ?<ContextProfile/> :<ContextLogin/>}
      
//       </LoginContext.Provider>
//       </div>
//   )
// }

// export default App



import React, { useEffect, useRef, useState , useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './Redux/counter/counterSlice';
import StopWatch from './Components/StopWatch';
import Navbar from './Components/Navbar';

const App = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const a = useRef(0);
  const ref = useRef();

  useEffect(() => {
    a.current = a.current + 1;
    console.log("a", a.current);
  });

  useEffect(() => {
    ref.current.style.backgroundColor = "red";
  }, []);

  const [adjective, setAdjective] = useState("hello");

  const changeAdjective = useCallback(() => {
    setAdjective("another");
  },[]);

  return (
    <div>
      <Navbar adjective={adjective} getAdjective={changeAdjective} />
      <div>
        <StopWatch/>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          ref={ref}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default App; // Change this line to default export
