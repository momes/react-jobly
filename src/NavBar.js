import { NavLink } from "react-router-dom";

/** NavBar
 * 
 * Props:
 * - currentUser: uncertain if object or string for now, may just pass in username
 * State:
 * 
 * App --> NavBar
 */
function NavBar({ currentUser }) {

  //comment out currentUser if condition to demo experience for logged in user
  //if (currentUser) {
    return (
      <div className="NavBar">
      Logged in Navbar
      <NavLink exact to="/">Jobly</NavLink>
      <NavLink exact to="/companies">Companies</NavLink>
      <NavLink exact to="/jobs">Jobs</NavLink>
      <NavLink exact to="/profile">Profile</NavLink>
      <NavLink exact to="/logout">Logout</NavLink>
      </div>
    );
  //}
  //else{
    return (
      <div className="NavBar">
      Logged out  Navbar
      <NavLink exact to="/">Jobly</NavLink>
      <NavLink exact to="/login">Login</NavLink>
      <NavLink exact to="/signup">Signup</NavLink>
      </div>
    );

  //}
}

export default NavBar;
