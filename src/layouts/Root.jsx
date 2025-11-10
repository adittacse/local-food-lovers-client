import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Root = () => {
    return (
        <div className="min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className="container bg-base-300 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;