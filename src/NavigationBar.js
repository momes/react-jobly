import { NavLink } from "react-router-dom";
import { Navbar, Nav, Link, NavDropdown, Brand , Button, Form } from "react-bootstrap";

/** NavigationBar
 * 
 * Props:
 * - currentUser {}
 * - logOut()
 * 
 * 
 * App --> NavigationBar
 */
function NavigationBar({ currentUser, logOut }) {

  function handleLogOut(evt) {
    evt.preventDefault();
    logOut();
  }

  return (
    < Navbar bg='dark' expand="lg" variant="dark" className="justify-content-between">
      <Navbar.Brand as={NavLink} to="/">Jobly</Navbar.Brand>
      {currentUser && <div className="navbar-nav ml-auto">
        <Nav.Link as={NavLink} to="/companies">Companies</Nav.Link>
        <Nav.Link as={NavLink} to="/jobs">Jobs</Nav.Link>
        <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
        <Form onSubmit={handleLogOut}>
        <button type="submit" className="btn btn-link text-muted">Logout {currentUser.username}</button>
        </Form>
      </div>}
      {!currentUser && <div className="navbar-nav ml-auto">
        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
        <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
      </div>}
    </Navbar >
  );
}

export default NavigationBar;