import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [role, setRole] = useState("user");
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (!user?.email || loading) return;

        setRoleLoading(true);

        axiosSecure
            .get(`/users/${user.email}/role`)
            .then(res => {
                setRole(res.data.role);
                setRoleLoading(false);
            })
            .catch(() => {
                setRole("user");
                setRoleLoading(false);
            });

    }, [user, loading, axiosSecure]);

    return { role, roleLoading };
};

export default useRole;
