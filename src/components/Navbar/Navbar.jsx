import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { ChefHat, Heart, LogOut, PlusCircle, UserRound } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";
import { Moon, Sun } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function Navbar(){
    const [theme, setTheme] = useState("light");
    const { user, userSignOut } = useContext(AuthContext);

    useEffect(() => {
        const saved = localStorage.getItem("app-theme");
        setTheme(saved || "light");
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("app-theme", theme);
    }, [theme]);

    const handleToggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-reviews">All Reviews</NavLink></li>
            {
                user && <>
                    <li><NavLink to="/add-review"><PlusCircle className='w-4 h-4'/>Add Review</NavLink></li>
                    <li><NavLink to="/my-reviews"><UserRound className='w-4 h-4'/>My Reviews</NavLink></li>
                </>
            }
        </>
    );

    const handleLogout = () => {
        userSignOut()
            .then(() => {
                toast.success("Signed out");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                });
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost gap-2 text-xl font-extrabold">
                    <ChefHat className="w-6 h-6 hidden md:block text-primary"/>
                    <span>Local Food Lovers</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <button onClick={handleToggleTheme}
                    className="btn btn-ghost btn-circle hidden md:flex justify-center mr-2"
                    aria-label="Toggle theme"
                    title="Toggle theme"
                >
                    {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
                {
                    user ? <>
                        <div className="dropdown dropdown-end z-10 mr-2">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL || user?.providerData?.[0]?.photoURL}
                                        alt="User image" />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li><NavLink to="/my-favorites"><Heart className='w-4 h-4'/>My Favorites</NavLink></li>
                            </ul>
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