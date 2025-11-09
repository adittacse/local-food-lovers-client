import { useContext } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <p>Loading...</p>
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;