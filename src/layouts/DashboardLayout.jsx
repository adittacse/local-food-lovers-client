import { Outlet } from "react-router";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar.jsx";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar.jsx";

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open min-h-screen">
            {/* drawer toggle */}
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* main content */}
            <div className="drawer-content flex flex-col">
                <DashboardNavbar />

                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </div>

            {/* sidebar */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <DashboardSidebar />
            </div>
        </div>
    );
};

export default DashboardLayout;