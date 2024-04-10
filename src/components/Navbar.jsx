import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase-config'
import { signOut } from 'firebase/auth';
import { FaRightFromBracket } from 'react-icons/fa6';

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
        <div className="logo">
          <p>blog</p>
        </div>
        <div className="links">
          <Link className='link' to='/'><p>Home</p></Link>
          <Link className='link' to="."><p>About</p></Link>
          <Link className='link' to='/'><p>Contact</p></Link>
          {!isAuth ? (
            <Link className='link' to="/login"> <p>Login</p> </Link>
            ) : (
            <>
            <Link className='link' to="/createpost"> <p>Create Post</p> </Link>
            <button className='logout-btn' onClick={signUserOut}> 
              <FaRightFromBracket/>
            </button>
            </>
          )}
        </div>
        
        
    </nav>
  )
}

export default Navbar
