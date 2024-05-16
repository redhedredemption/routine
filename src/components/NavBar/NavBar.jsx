import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';



export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      {/* Display links based on user authentication */}
      {user ? (
        <>
          <Link to="/">Home</Link>
          &nbsp;&nbsp;
          {/* Links available when the user is logged in */}
          <Link to="/routines">Routines</Link>
          &nbsp;&nbsp;
          {/* <Link to="/exercises/new">New Exercise</Link>
          &nbsp;&nbsp; */}
          <Link to="/exercises">Exercises</Link>
          &nbsp;&nbsp;
          {/* <Link to="/medications/new">New Medication</Link>
          &nbsp;&nbsp; */}
          <Link to="/medications">Medications</Link>
          &nbsp;&nbsp;
          {/* <Link to="/routines/new">New Routine</Link>
          &nbsp;&nbsp; */}
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <Link to="" onClick={handleLogOut}>Log Out</Link>
          </div>
        </>
      ) : (
        <>
          {/* Links available when no user is logged in */}
          <Link to="/auth">Login</Link>
          &nbsp;&nbsp;
          <Link to="/auth/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}








