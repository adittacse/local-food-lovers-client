import { NavLink } from "react-router";
import { Home, Heart, NotebookPen, UserRound, PlusCircle } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole.jsx";
import Loading from "../Loading/Loading.jsx";

export default function DashboardSidebar() {
    const { user, userSignOut } = useContext(AuthContext);
    const { role, roleLoading } = useRole();

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

    const base =
        "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200";
    const active = "bg-base-200 font-semibold";

    if (roleLoading) {
        return <Loading />;
    }

    return (
        <aside className="w-64 min-h-full bg-base-100 border-r">
            <div className="p-4 border-b">
                <h2 className="text-lg font-bold">Dashboard</h2>
                <p className="text-xs opacity-70 mt-1">
                    {user?.email || "Not logged in"}
                </p>
            </div>

            <ul className="p-4 space-y-2">
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `${base} ${isActive ? active : ""}`}
                        end
                    >
                        <Home className="w-4 h-4" />
                        Dashboard Home
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/dashboard/add-review"
                        className={({ isActive }) => `${base} ${isActive ? active : ""}`}
                        end
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Review
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/dashboard/my-reviews"
                        className={({ isActive }) => `${base} ${isActive ? active : ""}`}
                    >
                        <NotebookPen className="w-4 h-4" />
                        My Reviews
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/dashboard/my-favorites"
                        className={({ isActive }) => `${base} ${isActive ? active : ""}`}
                    >
                        <Heart className="w-4 h-4" />
                        My Favorites
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) => `${base} ${isActive ? active : ""}`}
                    >
                        <UserRound className="w-4 h-4" />
                        My Profile
                    </NavLink>
                </li>

                {
                    role === "admin" && (
                        <li>
                            <NavLink
                                to="/dashboard/manage-users"
                                className={({ isActive }) => `${base} ${isActive ? active : ""}`}
                            >
                                <UserRound className="w-4 h-4" />
                                Manage Users
                            </NavLink>
                        </li>
                    )
                }

                <button onClick={handleLogout} className="btn btn-sm btn-error btn-block mt-4">
                    Logout
                </button>
            </ul>
        </aside>
    );
}
