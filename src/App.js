import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from './NavBar';
import Routes from './Routes';
import JoblyApi from './api';


/** App
 * 
 * Props:
 * - none
 * State:
 * - currentUser: object
 * - isLoadingApp: boolean
 * 
 * App --> NavBar, Routes
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(function () {
    console.log("app component effect ran");
    async function getTestUser() {
      try {
        let user = await JoblyApi.getUser('testuser');
        setCurrentUser(currUser => user);
        setIsLoadingApp(false);
      } catch (err) {
        setErrors(err);
      }
    }
    getTestUser();
  }, []);

  function getUser(username) {
    //use token to get user obj
    setCurrentUser(username);
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
      {!isLoadingApp && (<div className="App">
        <BrowserRouter>
          <NavBar currentUser={currentUser} />
          <Routes currentUser={currentUser} addJobApp={updateUserAfterJobApp} />
        </BrowserRouter>
      </div>)}
    </div>
  );
}

export default App;
