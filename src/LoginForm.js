import { NavLink } from "react-router-dom";
import JoblyApi from './api';
import { useState } from "react";

function LoginForm({ updateCurrentUser }) {

  return (<h2>Login form</h2>);
//   const [loginFormData, setLoginFormData] = useState({username: "", password: ""})
//   const [loginAlert, setLoginAlert] = useState("");


//   //THIS IS ASYNC!!! TRY CATCH THIS
//   function handleSubmit(evt) {
//     evt.preventDefault();
//     let token = JoblyApi.loginUser(loginFormData);
//     if (!token) {
//       setLoginAler
//     }
//     updateCurrentUser(username);
//   }

//   function handleChange(evt) {
//     const { name, value } = evt.target;
//     setLoginFormData(currData => ({...currData, [name]: value}));
//   }

//   return (
//     <div className="LoginForm">
//       LoginForm!
//       <input 
//         name="username"
//         type="text"
//         onChange={handleChange}
//         value={loginFormData.username}
//         required
//         />
//       <input 
//         name="username"
//         type="password"
//         onChange={handleChange}
//         value={loginFormData.password}
//         required
//         />
//       <form onSubmit={handleSubmit}/>
//     </div>
//   );
}

export default LoginForm;
