import { useState } from "react";
import Error from "./Error";
import "./SignUpForm.css";
import { Form, ToggleButton } from "react-bootstrap";

const initialSignUpFormData = {
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  email: ""
}

/** SignUpForm Component
 * 
 * Props: 
 * - signUp()
 * 
 * State:
 * - signUpFormData: {}
 * - errors: null or []
 * 
 * Routes -> LoginForm
 */
function SignUpForm({ signUp }) {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [errors, setErrors] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setSignUpFormData(currData => ({ ...currData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("submit thinks loginformdata is", signUpFormData);
    try {
      await signUp(signUpFormData);
    } catch (err) {
      console.log("ERROR at handleSubmit->SignUp")
      setErrors(err);
    }
  }

  return (
    <div className="SignUpForm">
      <h3>Sign Up</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="signUpForm-first-name">First Name</Form.Label>
        <Form.Control
          id="signUpForm-first-name"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={signUpFormData.firstName}
          required
        />
        <Form.Label htmlFor="signUpForm-last-name">Last Name</Form.Label>
        <Form.Control
          id="signUpForm-last-name"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={signUpFormData.lastName}
          required
        />
        <Form.Label htmlFor="signUpForm-email">Email</Form.Label>
        <Form.Control
          id="signUpForm-email"
          name="email"
          type="text"
          onChange={handleChange}
          value={signUpFormData.email}
          required
        />
        <Form.Label htmlFor="signUpForm-username">Username</Form.Label>
        <Form.Control
          id="signUpForm-username"
          name="username"
          type="text"
          onChange={handleChange}
          value={signUpFormData.username}
          required
        />
        <Form.Label htmlFor="signUpForm-password">Password</Form.Label>
        <Form.Control
          id="signUpForm-password"
          name="password"
          type="password"
          onChange={handleChange}
          value={signUpFormData.password}
          required
        />
        <button className="btn" type="submit">Sign Up!</button>
      </Form>
      {errors && errors.map(e => <Error error={e} />)}
    </div>
  );
}

export default SignUpForm;
