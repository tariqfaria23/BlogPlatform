import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase-config'
import { signOut } from 'firebase/auth';

const Navbar = ({ isAuth, setIsAuth}) => {

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <nav>
        <Link to='/'>Home</Link>
        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Link to="/createpost"> Create Post </Link>
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
    </nav>
  )
}

export default Navbar
