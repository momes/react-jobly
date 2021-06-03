import { useState } from "react";
import Error from "./Error";

/** LoginForm Component
 * 
 * Props: 
 * - logIn()
 * 
 * State:
 * - loginFormData: {}
 * - errors: null or []
 * 
 * Routes -> LoginForm
 */
function LoginForm({ logIn }) {
  const [loginFormData, setLoginFormData] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginFormData(currData => ({ ...currData, [name]: value }));
  }


  // TODO handleSubmit can be async
  function handleSubmit(evt) {
    async function logInOrShowError() {
      console.log("submit thinks loginformdata is", loginFormData);
      try {
        await logIn(loginFormData);
      } catch (err) {
        console.log("ERROR at handleSubmit->logIn")
        setErrors(err);
      }
    }
    evt.preventDefault();
    logInOrShowError();
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
