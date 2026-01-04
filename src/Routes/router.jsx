import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import AllReviews from "../pages/AllReviews/AllReviews.jsx";
import AddReview from "../pages/Dashboard/AddReview/AddReview.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ReviewDetails from "../pages/ReviewDetails/ReviewDetails.jsx";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews.jsx";
import MyFavorites from "../pages/Dashboard/MyFavorites/MyFavorites.jsx";
import EditReview from "../pages/Dashboard/EditReview/EditReview.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Overview from "../pages/Dashboard/Overview/Overview.jsx";
import Profile from "../pages/Dashboard/Profile/Profile.jsx";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminAllReviews from "../pages/Dashboard/AdminAllReviews/AdminAllReviews.jsx";
import About from "../pages/About/About.jsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "all-reviews",
                element: <AllReviews />
            },
            {
                path: "reviews/:id",
                loader: ({ params }) => fetch(`https://local-food-lovers-server.onrender.com/reviews/${params.id}`),
                element: <ReviewDetails />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Overview />
            },
            {
                path: "all-reviews",
                element: <AdminRoute><AdminAllReviews /></AdminRoute>
            },
            {
                path: "my-reviews",
                element: <MyReviews />
            },
            {
                path: "add-review",
                element: <AddReview />
            },
            {
                path: "edit-review/:id",
                loader: ({ params }) => fetch(`https://local-food-lovers-server.onrender.com/reviews/${params.id}`),
                element: <EditReview />
            },
            {
                path: "my-favorites",
                element: <MyFavorites />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "manage-users",
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
        ]
    }
]);

export default Router;