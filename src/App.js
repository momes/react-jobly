import './App.css';
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import NavBar from './NavBar';
import Routes from './Routes';
import JoblyApi from './api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingApp, setIsLoadingApp] = useState(false);

  function getUser(username) {
    //use token to get user obj
    setCurrentUser(user)
  }

  return (
    <div className="App">
      <NavBar currentUser={currentUser} />
      <BrowserRouter>
        <Routes currentUser={currentUser} />
      </BrowserRouter>
    </div>
  );
}

export default App;
