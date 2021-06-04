import { useState } from "react";
import Error from "./Error";
import "./LoginForm.css"
import { Form, ToggleButton } from "react-bootstrap";

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

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await logIn(loginFormData);
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="LoginForm">
      <h3>Log in</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="LoginForm-username">Username</Form.Label>
        <Form.Control
          id="LoginForm-username"
          name="username"
          type="text"
          onChange={handleChange}
          value={loginFormData.username}
          required
        />
        <Form.Label htmlFor="LoginForm-password">Password</Form.Label>
        <Form.Control
          id="LoginForm-password"
          name="password"
          type="password"
          onChange={handleChange}
          value={loginFormData.password}
          required
        />
        <button className="btn" type="submit">Login!</button>
      </Form>
      {errors && errors.map(e => <Error error={e} />)}
    </div>
  );
}

export default LoginForm;
