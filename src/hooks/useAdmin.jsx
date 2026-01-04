import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if (!loading && user?.email) {
            axiosSecure
                .get(`/users/admin/${user.email}`)
                .then(res => {
                    setIsAdmin(res?.data?.admin);
                    setIsAdminLoading(false);
                });
        }
    }, [user, loading, axiosSecure]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
