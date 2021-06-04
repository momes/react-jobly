import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { decode } from "jsonwebtoken";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavigationBar from './NavigationBar';
import Routes from './Routes';
import JoblyApi from './api';
import Error from './Error';

/** App
 * 
 * Props:
 * - none
 * 
 * State:
 * - currentUser: {}
 * - token ""
 * - isLoadingUser: boolean
 * - fetchUserErrors: []
 * 
 * App --> NavigationBar, Routes
 */
function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.token);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [fetchUserErrors, setFetchUserErrors] = useState(null);

  console.log("app rerendered");

  async function logIn(loginFormData) {
    let token = await JoblyApi.logInUser(
      {
        username: loginFormData.username,
        password: loginFormData.password
      });
    JoblyApi.token = token;
    window.localStorage.setItem('token', token); //could replace this to use =
    console.log("logIn() successful -> fetching user")
    setToken(token);
  }

  async function signUp(signUpFormData) {
    let token = await JoblyApi.signUpUser(signUpFormData);
    JoblyApi.token = token;
    setToken(token);
    console.log("signUp() successful -> fetching user")
  }

  useEffect(function setCurrentUserOrError() {
    console.log("fetching current user");
    async function fetchUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          const { username } = decode(token);
          let user = await JoblyApi.getUser(username);
          console.log("got below get user API call");
          setCurrentUser({ ...user, applications: new Set(user.applications) }); // TODO update set name
          setFetchUserErrors(null);
        } catch (err) {
          setFetchUserErrors(err);
        }

      }
      setIsLoadingUser(false);
    }
    fetchUser();
  }, [token]);

  function logOut() {
    setToken(null);
    setCurrentUser(null);
    window.localStorage.clear(); //TODO can switch to removeItem for the token instead of clear
  }

  function updateUserAfterJobApp(jobId) {
    setCurrentUser(currUser => ({
      ...currUser,
      applications: currUser.applications.add(
        jobId)
    }));
  }

  async function updateUserInfo(profileFormData) {

  const { username, password, firstName, lastName, email } = profileFormData;
    let token = await JoblyApi.logInUser(
      {
        username: username,
        password: password
      });
    let updatedUser = await JoblyApi.updateUser(username, { firstName, lastName, email, password});
    console.log("got past both update user API calls");
    console.log("updated user is", updatedUser);
    setCurrentUser(currUser => ({
      ...currUser,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email
    }));
  }

  if (isLoadingUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar currentUser={currentUser} logOut={logOut} />

        {fetchUserErrors && fetchUserErrors.map(e => <Error error={e} />)}

        <Routes currentUser={currentUser}
          addJobApp={updateUserAfterJobApp}
          logIn={logIn}
          signUp={signUp}
          updateUserInfo={updateUserInfo}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

