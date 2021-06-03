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
 * App -> Routes -> Homepage
 *               -> CompanyList
 *  *            -> CompanyDetail
 *  *            -> JobList
 *  *            -> ProfileForm
 *  *            -> LoginForm
 *  *            -> SignUpForm
 * 
 */
function Routes({ currentUser, addJobApp, logIn, signUp}) {
  console.log("routes thinks current user is", currentUser);

  //TODO if not logged in /companies redirect to signup
  // if /foo redirect to homepage
  //use a private route component
  return (
    <>
      {currentUser && <Switch>
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

      {!currentUser && <Switch>
        <Route exact path="/">
          <Homepage currentUser={currentUser} />
        </Route>
        <Route exact path="/login">
          <LoginForm logIn={logIn}/>
        </Route>
        <Route exact path="/signup">
          <SignUpForm signUp={signUp}/>
        </Route>
        <Route path="/companies">
          <Redirect to="/login" />
        </Route>
        <Route path="/jobs">
          <Redirect to="/login" />
        </Route>
        <Route path="/profile">
          <Redirect to="/login" />
        </Route>
        <Redirect to="/" />
      </Switch>
      }
    </>);
}

export default Routes;
