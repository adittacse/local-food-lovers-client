import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-base-300">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;