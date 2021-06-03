import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import JoblyApi from './api';
import { useState, useEffect } from "react";
import Error from "./Error";

function LoginForm({ updateCurrentUser, storeToken, authenticateUser }) {

  const [tryLogin, setTryLogin] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState(null);
  //const [loginAlert, setLoginAlert] = useState("");

  // useEffect(function authUserOrError() {
  //   async function authUser() {
  //     try {
  //       console.log("effect thinks login data is", loginFormData);
  //       let token = await JoblyApi.logInUser({username: loginFormData.username, password: loginFormData.password});
  //       storeToken(token);
  //       updateCurrentUser(loginFormData.username);
  //       setTryLogin(false);
  //     } catch (err) {
  //       setErrors(err);
  //       setTryLogin(false);
  //     }
  //   }
  //   if (tryLogin) authUser();
  // }, [tryLogin])

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
        <input
          name="username"
          type="text"
          onChange={handleChange}
          value={loginFormData.username}
          required
        />
        <input
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
