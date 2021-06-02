import { NavLink } from "react-router-dom";
import Button from "react-bootstrap";
import { Navbar, Nav, Link, NavDropdown, Brand } from "react-bootstrap";

/** NavigationBar
 * 
 * Props:
 * - currentUser {}
 * State:
 * 
 * App --> NavigationBar
 */
function NavigationBar({ currentUser }) {

  return (
    < Navbar bg='dark' expand="lg" variant="dark" className="justify-content-between">
      <Navbar.Brand as={NavLink} to="/">Jobly</Navbar.Brand>
      {currentUser && <div className="navbar-nav ml-auto">
        <Nav.Link as={NavLink} to="/companies">Companies</Nav.Link>
        <Nav.Link as={NavLink} to="/jobs">Jobs</Nav.Link>
        <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
        <Nav.Link as={NavLink} to="/logout">Logout {currentUser.username}</Nav.Link>
      </div>}
      {!currentUser && <div className="navbar-nav ml-auto">
        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
        <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
      </div>}
    </Navbar >
  );
}

export default NavigationBar;