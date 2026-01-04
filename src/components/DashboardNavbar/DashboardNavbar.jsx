import { Link, NavLink, useNavigate } from "react-router";
import { Menu, LogOut, LayoutDashboard, UserRound, Moon, Sun } from "lucide-react";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext.jsx";
import toast from "react-hot-toast";

export default function DashboardNavbar() {
    const [theme, setTheme] = useState("light");
    const { user, userSignOut } = useContext(AuthContext);
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        try {
            await userSignOut();
            toast.success("Logged out!");
            navigate("/login");
        } catch (err) {
            toast.error(err?.message || "Logout failed");
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-md px-3 md:px-6 sticky top-0 z-50">
            {/* left */}
            <div className="flex-1 gap-2">
                {/* mobile drawer button */}
                <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle lg:hidden">
                    <Menu className="w-5 h-5" />
                </label>

                <Link to="/" className="font-bold text-lg md:text-xl">
                    Local Food Lovers
                </Link>
            </div>

            {/* right */}
            <div className="flex gap-2">
                <button onClick={handleToggleTheme}
                        className="btn btn-ghost btn-circle hidden md:flex justify-center mr-2"
                        aria-label="Toggle theme"
                        title="Toggle theme"
                >
                    {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>

                {/* profile dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user?.providerData?.[0]?.photoURL || user?.photoURL} alt="User" />
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow"
                    >
                        <li className="px-2 py-1 opacity-70 text-xs">
                            {user?.displayName || "User"}
                        </li>

                        <li>
                            <NavLink to="/dashboard/profile">
                                <UserRound className="w-4 h-4" />
                                Profile
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard">
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard Home
                            </NavLink>
                        </li>

                        <li>
                            <button onClick={handleLogout}>
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
