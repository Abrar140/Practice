// // import React from 'react';
// // import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// // import Home from './components/Home';
// // import About from './components/About';
// // import NotFound from './components/NotFound';

// // const App = () => {
// //   return (
// //     <Router>
// //       <div>
// //         <Switch>
// //           <Route path="/" exact component={Home} />
// //           <Route path="/about" component={About} />
// //           <Route component={NotFound} />
// //         </Switch>
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;

// // import React, { useState } from "react";
// // import axios from "axios";

// // const App = () => {
// //   const [fullName, setFullName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post("/user/signup", { fullName, email, password });
// //       window.location.href = "/"; // Redirect to home page after successful signup
// //     } catch (error) {
// //       console.log("this is errror" + error);
// //       // Handle error (display message, etc.)
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Sign Up</h2>
// //       <form onSubmit={handleSubmit}>
// //         <label>Full Name:</label>
// //         <input
// //           type="text"
// //           value={fullName}
// //           onChange={(e) => setFullName(e.target.value)}
// //           required
// //         />
// //         <br />
// //         <label>Email:</label>
// //         <input
// //           type="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <br />
// //         <label>Password:</label>
// //         <input
// //           type="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         <br />
// //         <button type="submit">Sign Up</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default App;


// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/user/signup', { fullName, email, password });
//       window.location.href = '/'; // Redirect to home page after successful signup
//     } catch (error) {
//       console.log("This is error: " + error);
//       // Handle error (display message, etc.)
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Full Name:</label>
//         <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
//         <br />
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <br />
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <br />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default App;


import React from 'react'
import Kanban from './components/Kanban/Kanban'

function App() {
  return (
    <div>
    <Kanban/>
    </div>
  )
}

export default App