import { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ProfileForm from "./ProfileForm";


/**
 * Routes Component
 * 
 * Props:
 * - currentUser {}
 * - addJobApp()
 * 
 * State:
 * - isAuthorized
 * 
 */
function Routes({ currentUser, addJobApp }) {
  //should the state default to current user then change to a boolean?
  const [isAuthorized, setIsAuthorized] = useState(currentUser);
  console.log("routes thinks current user is", currentUser);
  console.log("routes thinks isAuthorized is", isAuthorized);

  useEffect(function(){
    if (currentUser){
      setIsAuthorized(true);
    }
  }, [currentUser]);

  return (
    <Switch>
      {isAuthorized && <Switch>
        <Route exact path="/">
          <Homepage currentUser={currentUser} />
        </Route>
        <Route exact path="/companies">
          <CompanyList currentUser={currentUser} />
        </Route>
        <Route exact path="/companies/:handle">
          <CompanyDetail currentUser={currentUser} addJobApp={addJobApp} />
        </Route>
        <Route exact path="/jobs">
          <JobList currentUser={currentUser} addJobApp={addJobApp} />
        </Route>
        <Route exact path="/profile">
          <ProfileForm currentUser={currentUser} />
        </Route>
        <Redirect to="/" />
      </Switch>}

      {!isAuthorized && <Switch>
        <Route exact path="/">
          <Homepage currentUser={currentUser} />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/signup">
          <SignUpForm />
        </Route>
        <Redirect to="/" />
      </Switch>
      }
    </Switch>);
}

export default Routes;
