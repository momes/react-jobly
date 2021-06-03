import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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
        : (<div>
          <Link to="/login"><Button>Log In</Button></Link> 
          <Link to="/signup"><Button>Sign Up</Button></Link>
          </div>)}
    </div>
  );
}

export default Homepage;
