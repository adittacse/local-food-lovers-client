import { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext.jsx";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const Profile = () => {
    const { user, updateUser, setUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // detect provider
    const provider =
        user?.providerData?.[0]?.providerId === "google.com"
            ? "google"
            : "manual";

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;

        try {
            /**
             * 1. Update Firebase (manual user only)
             */
            if (provider === "manual") {
                await updateUser({
                    displayName: name,
                    photoURL: photoURL,
                });

                // update local auth context
                setUser({
                    ...user,
                    displayName: name,
                    photoURL: photoURL,
                });
            }

            /**
             * 2. Update MongoDB user profile
             */
            await axiosSecure.put(`/users/${user.email}`, {
                displayName: name,
                photoURL: photoURL,
            });

            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            toast.error(err.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
                <p className="opacity-70 mt-1">
                    View and update your profile information
                </p>
            </div>

            {/* Profile Card */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar */}
                        <div className="flex flex-col items-center gap-3">
                            <img
                                src={user?.providerData[0]?.photoURL || user?.photoURL}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border"
                            />
                            <p className="text-sm opacity-70">
                                Profile Picture
                            </p>
                        </div>

                        {/* Info / Form */}
                        <div className="flex-1 w-full">
                            {!isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm opacity-70">Name</p>
                                        <p className="font-semibold text-lg">
                                            {user?.displayName || "Not set"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm opacity-70">Email</p>
                                        <p className="font-semibold text-lg">
                                            {user?.email}
                                        </p>
                                    </div>

                                    {provider === "manual" && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="btn btn-primary mt-4"
                                        >
                                            Edit Profile
                                        </button>
                                    )}

                                    {provider === "google" && (
                                        <p className="text-sm text-warning mt-4">
                                            Google profile information cannot be edited.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleUpdateProfile}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="label">
                                            <span className="label-text">
                                                Name
                                            </span>
                                        </label>
                                        <input
                                            name="name"
                                            defaultValue={user?.displayName}
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">
                                                Photo URL
                                            </span>
                                        </label>
                                        <input
                                            name="photoURL"
                                            defaultValue={user?.photoURL}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? "Saving..." : "Save Changes"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="btn btn-ghost"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
