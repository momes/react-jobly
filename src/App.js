import './App.css';
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
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
  const [isLoadingApp, setIsLoadingApp] = useState(false);

  //setCurrentUser("test");

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
