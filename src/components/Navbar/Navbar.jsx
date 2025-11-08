import { Link, NavLink, useNavigate } from "react-router";
import { ChefHat, Heart, LogOut, PlusCircle, UserRound } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";

export default function Navbar(){
    const { user, userSignOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/reviews">All Reviews</NavLink></li>
            {
                user && <>
                    <li><NavLink to="/add-review"><PlusCircle className='w-4 h-4'/>Add Review</NavLink></li>
                    <li><NavLink to="/my-reviews"><UserRound className='w-4 h-4'/>My Reviews</NavLink></li>
                    <li><NavLink to="/favorites"><Heart className='w-4 h-4'/>My Favorites</NavLink></li>
                </>
            }
        </>
    );

    const handleLogout = () => {
        userSignOut()
            .then(() => {
                // user signed out
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                            <img className="rounded-full w-10 h-10 mr-3" src={user?.photoURL || user?.providerData?.[0]?.photoURL} alt="User image"/>
                        </div>
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                    </> : <>
                        <Link to="/login" className="btn btn-secondary mr-2">
                            <span className="primary">Login</span>
                        </Link>
                        <Link to="/register" className="btn btn-primary">Register</Link>
                    </>
                }
            </div>
        </div>
    );
}