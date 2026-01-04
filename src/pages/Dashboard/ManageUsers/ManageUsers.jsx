import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get("/users").then(res => {
            setUsers(res.data);
            setLoading(false);
        });
    }, [axiosSecure]);

    const handleMakeAdmin = async (user) => {
        const roleInfo = {
            role: "admin"
        };

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.displayName} marked as an Admin`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                            setUsers(prev =>
                                prev.map(u =>
                                    u.email === user.email ? { ...u, role: "admin" } : u
                                )
                            );
                        }
                    });
            }
        });
    };

    const handleMakeUser = async (user) => {
        const roleInfo = {
            role: "user"
        };

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make User!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.displayName} marked as an User`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                            setUsers(prev =>
                                prev.map(u =>
                                    u.email === user.email ? { ...u, role: "user" } : u
                                )
                            );
                        }
                    });
            }
        });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-center">Manage Users</h2>

            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                    <thead>
                    <tr>
                        <th>Sl.</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, idx) => (
                        <tr key={user._id}>
                            <td>{idx + 1}</td>
                            <td>
                                <img
                                    src={user.photoURL}
                                    alt=""
                                    className="w-10 h-10 rounded-full"
                                />
                            </td>
                            <td>{user.displayName}</td>
                            <td>{user.email}</td>
                            <td className="font-semibold capitalize">
                                {user.role || "user"}
                            </td>
                            <td>
                                {
                                    user.role === "user" && (
                                        <button
                                            onClick={() =>
                                                handleMakeAdmin(user)
                                            }
                                            className="btn btn-sm btn-primary"
                                        >
                                            Make Admin
                                        </button>
                                    )
                                }
                                {
                                    user.role === "admin" && (
                                        <button
                                            onClick={() =>
                                                handleMakeUser(user)
                                            }
                                            className="btn btn-sm btn-primary"
                                        >
                                            Make User
                                        </button>
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
