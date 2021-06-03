import { useState } from "react";
import Error from "./Error";

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

  //TODO handleSubmit can be async don't need wrapper
  function handleSubmit(evt) {
    async function signUpOrShowError() {
      console.log("submit thinks loginformdata is", signUpFormData);
      try {
        await signUp(signUpFormData);
      } catch (err) {
        console.log("ERROR at handleSubmit->SignUp")
        setErrors(err);
      }
    }
    evt.preventDefault();
    signUpOrShowError();
  }

  return (
    <div className="signUpForm">
      signUpForm!
      <form onSubmit={handleSubmit}>
        <label htmlFor="signUpForm-first-name">First Name</label>
        <input
          id="signUpForm-first-name"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={signUpFormData.firstName}
          required
        />
        <label htmlFor="signUpForm-last-name">Last Name</label>
        <input
          id="signUpForm-last-name"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={signUpFormData.lastName}
          required
        />
        <label htmlFor="signUpForm-email">Email</label>
        <input
          id="signUpForm-email"
          name="email"
          type="text"
          onChange={handleChange}
          value={signUpFormData.email}
          required
        />
        <label htmlFor="signUpForm-username">Username</label>
        <input
          id="signUpForm-username"
          name="username"
          type="text"
          onChange={handleChange}
          value={signUpFormData.username}
          required
        />
        <label htmlFor="signUpForm-password">Password</label>
        <input
          id="signUpForm-password"
          name="password"
          type="password"
          onChange={handleChange}
          value={signUpFormData.password}
          required
        />
        <button type="submit">Sign Up!</button>
      </form>
      {errors && errors.map(e => <Error error={e} />)}
    </div>
  );
}

export default SignUpForm;
