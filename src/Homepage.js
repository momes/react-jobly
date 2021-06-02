import { NavLink } from "react-router-dom";

function Homepage({currentUser}) {

console.log("homepage thinks current user is", currentUser);

  return (
    <div className="Homepage">
      Homepage!
    </div>
  );
}

export default Homepage;
