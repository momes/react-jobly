import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from './NavBar';
import Routes from './Routes';
import JoblyApi from './api';

const testUser = { username: "testuser"};

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
  const [currentUser, setCurrentUser] = useState(testUser);
  const [isLoadingApp, setIsLoadingApp] = useState(false);

  useEffect(function(){
    async function getTestUser(){
      let user = await JoblyApi.getUser('testuser');
      setCurrentUser(user);
    }
    getTestUser();
  },[]);

  function getUser(username) {
    //use token to get user obj
    setCurrentUser(username);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar currentUser={currentUser} />
        <Routes currentUser={currentUser} />
      </BrowserRouter>
    </div>
  );
}

export default App;
