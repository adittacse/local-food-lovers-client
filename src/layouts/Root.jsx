import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Root = () => {
    return (
        <div className="font-roboto min-h-screen bg-base-300">
            <header>
                <Navbar />
            </header>
            <main className="container flex flex-col w-11/12 mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;