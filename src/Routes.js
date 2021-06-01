import { Route, Redirect, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ProfileForm from "./ProfileForm";

function Routes({ currentUser }) {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage currentUser={currentUser} />
      </Route>
      <Route exact path="/companies">
        <CompanyList />
      </Route>
      <Route exact path="/companies/:handle">
        <CompanyDetail currentUser={currentUser} />
      </Route>
      <Route exact path="/jobs">
        <JobList currentUser={currentUser} />
      </Route>
      <Route exact path="/login">
        <LoginForm/>
      </Route>
      <Route exact path="/signup">
        <SignUpForm/>
      </Route>
      <Route exact path="/profile">
        <ProfileForm currentUser={currentUser} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
