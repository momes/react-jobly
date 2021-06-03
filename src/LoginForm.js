import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import JoblyApi from './api';
import { useState, useEffect } from "react";
import Error from "./Error";

function LoginForm({ authenticateUser }) {

  const [tryLogin, setTryLogin] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState(null);
  //const [loginAlert, setLoginAlert] = useState("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginFormData(currData => ({ ...currData, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("submit thinks loginformdata is", loginFormData);
    authenticateUser(loginFormData);
  }

  return (
    <div className="LoginForm">
      LoginForm!
      <form onSubmit={handleSubmit}>
      <label htmlFor="LoginForm-username">Username</label>
        <input
          id="LoginForm-username"
          name="username"
          type="text"
          onChange={handleChange}
          value={loginFormData.username}
          required
        />
      <label htmlFor="LoginForm-password">Password</label>
        <input
          id="LoginForm-password"
          name="password"
          type="password"
          onChange={handleChange}
          value={loginFormData.password}
          required
        />
        <button type="submit">Login!</button>
      </form>
      {errors && errors.map(e => <Error error={e} />)}
    </div>
  );
}

export default LoginForm;
