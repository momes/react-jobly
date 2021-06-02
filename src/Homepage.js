import { NavLink } from "react-router-dom";

/**Homepage Component
 * 
 * Props:
 * -currentUser {}
 * 
 * Routes -> Homepage
*/
function Homepage({currentUser}) {

console.log("homepage thinks current user is", currentUser);

  return (
    <div className="Homepage">
      <h1>Jobly</h1>
      <p>All the jobs in one convenient place</p>
      {currentUser
        ? <h2>Welcome Back, {currentUser.firstName}.</h2>
        : (<p>login & sign up buttons go here</p>)}
    </div>
  );
}

export default Homepage;
