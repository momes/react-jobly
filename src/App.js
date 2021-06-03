import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { decodeToken } from "react-jwt";
import { reactLocalStorage } from "reactjs-localstorage";
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
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [token, setToken] = useState(reactLocalStorage.get("token"));
  const [fetchUserErrors, setFetchUserErrors] = useState(null);

  console.log("app rerendered");

  async function logIn(loginFormData) {
    let token = await JoblyApi.logInUser(
      {
        username: loginFormData.username,
        password: loginFormData.password
      });
    JoblyApi.token = token;
    reactLocalStorage.set('token', token);
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
      try {
        JoblyApi.token = token;
        setIsLoadingUser(true);
        const username = decodeToken(token).username;
        console.log("console log things token is", reactLocalStorage.get("token"));
        let user = await JoblyApi.getUser(username);
        console.log("got below get user API call");
        setCurrentUser({ ...user, applications: new Set(user.applications) });
        setIsLoadingUser(false);
        setFetchUserErrors(null);
      } catch (err) {
        setFetchUserErrors(err);
        setIsLoadingUser(false);
      }
    }
    if (token) {
      fetchUser();
    }
  }, [token]);

  function logOut() {
    setToken(null);
    setCurrentUser(null);
    reactLocalStorage.clear();
  }

  function updateUserAfterJobApp(jobId) {
    //let applicationCopy = currentUser.applications.add(jobId);
    //applications.add(jobId);
    setCurrentUser(currUser => ({ ...currUser, applications: currUser.applications.add(jobId) }));
  }

  console.log("app thinks current user is", currentUser);

  if (isLoadingUser) {
    return (<div>Loading...</div>)
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
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

