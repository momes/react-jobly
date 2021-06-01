import { NavLink } from "react-router-dom";
import Button from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Link, NavDropdown, Brand } from "react-bootstrap";

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

  return (
    < Navbar bg='dark' expand="lg" variant="dark" className="justify-content-between">
      <Navbar.Brand as={NavLink} to="/">Jobly</Navbar.Brand>
      {currentUser && <div className="navbar-nav ml-auto">
        <Nav.Link as={NavLink} to="/companies">Companies</Nav.Link>
        <Nav.Link as={NavLink} to="/jobs">Jobs</Nav.Link>
        <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
        <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
      </div>}
      {!currentUser && <div className="navbar-nav ml-auto">
        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
        <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
      </div>}
    </Navbar >
  );
}

export default NavBar;

//change divs to nav tags
//specific class names
//potentially lowercase the B