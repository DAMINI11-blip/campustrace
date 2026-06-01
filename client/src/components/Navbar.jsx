import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeToggle from "./Themetoggle";

import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const { user, setUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (

    <nav>

      {/* Left Side */}

      <h2>CampusTrace</h2>

      {/* Right Side */}

      <div className="nav-right">

        {user && (

          <span className="user-badge">

            Welcome, {user.name}

          </span>
        )}

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          {user ? (
            <>

              <Link to="/add-item">
                Add Item
              </Link>

              <Link to="/my-posts">
                My Posts
              </Link>

              <ThemeToggle />
              
              <button onClick={handleLogout}>
                Logout
              </button>

            </>
          ) : (
            <>

              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>

            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;