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
 * - isLoadingApp: boolean
 * - setErrors: []
 * 
 * App --> NavigationBar, Routes
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginFormData, setLoginFormData] = useState(null);
  const [signUpFormData, setSignUpFormData] = useState(null);
  const [authenticatedUsername, setAuthenticatedUsername] = useState(null);
  const [isLoadingApp, setIsLoadingApp] = useState(false);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState(null);


  useEffect(function authUserOrError() {
    async function authUser() {
      try {
        if (loginFormData) {
          console.log("effect thinks login data is", loginFormData);
          let token = await JoblyApi.logInUser({ username: loginFormData.username, password: loginFormData.password });
          setToken(token);
          JoblyApi.token = token;
          setAuthenticatedUsername(loginFormData.username);
          setLoginFormData(null);
        }
        else if (signUpFormData) {
          console.log("effect thinks signup data is", signUpFormData);
          let token = await JoblyApi.signUpUser(signUpFormData);
          setToken(token);
          JoblyApi.token = token;
          setAuthenticatedUsername(signUpFormData.username);
          setSignUpFormData(null);
        }
      } catch (err) {
        setErrors(err);
        setSignUpFormData(null);
      }
    }
    if (loginFormData || signUpFormData) authUser();
  }, [loginFormData, signUpFormData]);


  useEffect(function setCurrentUserOrError() {
    console.log("app component effect ran");
    async function fetchUser() {
      try {
        //let user = await JoblyApi.getUser('testuser');
        console.log("authenticated username is", authenticatedUsername);
        setIsLoadingApp(true);
        let user = await JoblyApi.getUser(authenticatedUsername);
        console.log("got below get user API call");
        setCurrentUser(user);
        setIsLoadingApp(false);
        //setAuthenticatedUsername(null);
      } catch (err) {
        //console.log("err is", err);
        setErrors(err);
        setIsLoadingApp(false);
        setAuthenticatedUsername(null);
      }
    }
    if (authenticatedUsername) {
      fetchUser();
    }
  }, [token, authenticatedUsername]);


  function authenticateUser(formData) {
    setLoginFormData(formData);
  }

  function registerUser(formData){
    console.log("register user thinks data is", formData);
    setSignUpFormData(formData);
  }

  function updateCurrentUser(username) {
    //setUsername(username);
  }

  function updateUserAfterJobApp(jobId) {
    //currentUser.applications.push(jobId);
    let applicationCopy = currentUser.applications.slice();
    //let currentUserCopy = {...currentUser};
    setCurrentUser(CurrUser => ({ ...currentUser, applications: applicationCopy }));
  }

  console.log("app thinks current user is", currentUser);
  return (
    <div>
      {errors && errors.map(e => <Error error={e} />)}
      {!isLoadingApp && (<div className="App">
        <BrowserRouter>
          <NavigationBar currentUser={currentUser} />
          <Routes currentUser={currentUser}
            addJobApp={updateUserAfterJobApp}
            authenticateUser={authenticateUser}
            registerUser={registerUser}
          />
        </BrowserRouter>
      </div>)}
    </div>
  );
}

export default App;
