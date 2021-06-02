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
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(function () {
    console.log("app component effect ran");
    async function fetchTestUser() {
      try {
        let user = await JoblyApi.getUser('testuser');
        setCurrentUser(user);
        setIsLoadingApp(false);
      } catch (err) {
        setErrors(err);
      }
    }
    fetchTestUser();
  }, []);

  function updateUserAfterJobApp(jobId) {
    //currentUser.applications.push(jobId);
    let applicationCopy = currentUser.applications.slice();
    //let currentUserCopy = {...currentUser};
    setCurrentUser(CurrUser => ({ ...currentUser, applications: applicationCopy }));
  }

  console.log("app thinks current user is", currentUser);
  return (
    <div>
      {errors && errors.map(e => <Error error={e}/>)}
      {!isLoadingApp && (<div className="App">
        <BrowserRouter>
          <NavigationBar currentUser={currentUser} />
          <Routes currentUser={currentUser} addJobApp={updateUserAfterJobApp} />
        </BrowserRouter>
      </div>)}
    </div>
  );
}

export default App;
