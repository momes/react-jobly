import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
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
 * - authenticatedUsername ""
 * - token ""
 * - isLoadingApp: boolean
 * - errors: []
 * 
 * App --> NavigationBar, Routes
 */
function App() {
  //TODO change isloadingapp name, its loading/fetching user
  //TODO change errors, setErrors name
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticatedUsername, setAuthenticatedUsername] = useState(null);
  const [isLoadingApp, setIsLoadingApp] = useState(false);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState(null);

  async function logIn(loginFormData) {
    let token = await JoblyApi.logInUser(
      {
        username: loginFormData.username,
        password: loginFormData.password
      });
    JoblyApi.token = token;
    console.log("logIn() successful -> fetching user")
    setToken(token);
    setAuthenticatedUsername(loginFormData.username);
  }

  async function signUp(signUpFormData) {
    let token = await JoblyApi.signUpUser(signUpFormData);
    JoblyApi.token = token;
    setToken(token);
    setAuthenticatedUsername(signUpFormData.username);
    console.log("signUp() successful -> fetching user")
  }

  useEffect(function setCurrentUserOrError() {
    console.log("fetching current user");
    async function fetchUser() {
      try {
        console.log("authenticated username is", authenticatedUsername);
        setIsLoadingApp(true);
        let user = await JoblyApi.getUser(authenticatedUsername);
        //jwt.decode
        console.log("got below get user API call");
        setCurrentUser(user);
        setIsLoadingApp(false);
      } catch (err) {
        setErrors(err);
        setIsLoadingApp(false);
        setAuthenticatedUsername(null);
      }
    }
    if (token) {
      fetchUser();
    }
  }, [token, authenticatedUsername]);

  function logOut() {
    setToken(null);
    setAuthenticatedUsername(null);
    setCurrentUser(null);
  }

  function updateUserAfterJobApp(jobId) {
    //currentUser.applications.push(jobId);
    let applicationCopy = currentUser.applications.slice();
    //let currentUserCopy = {...currentUser};
    setCurrentUser(CurrUser => ({ ...currentUser, applications: applicationCopy }));
  }

  console.log("app thinks current user is", currentUser);

  if (isLoadingApp) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar currentUser={currentUser} logOut={logOut} />

        {errors && errors.map(e => <Error error={e} />)}

        <Routes currentUser={currentUser}
          addJobApp={updateUserAfterJobApp}
          logIn={logIn}
          signUp={signUp}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

