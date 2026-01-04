import { Navigate } from "react-router";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading/Loading";

const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin();

    if (isAdminLoading) {
        return <Loading />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
