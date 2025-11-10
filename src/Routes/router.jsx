import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import AllReviews from "../pages/AllReviews/AllReviews.jsx";
import AddReview from "../pages/AddReview/AddReview.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ReviewDetails from "../pages/ReviewDetails/ReviewDetails.jsx";
import MyReviews from "../pages/MyReviews/MyReviews.jsx";
import MyFavorites from "../pages/MyFavorites/MyFavorites.jsx";

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
                loader: ({ params }) => fetch(`http://localhost:3000/reviews/${params.id}`),
                element: <ReviewDetails />
            },
            {
                path: "add-review",
                element: <PrivateRoute><AddReview /></PrivateRoute>
            },
            {
                path: "my-reviews",
                element: <PrivateRoute><MyReviews /></PrivateRoute>
            },
            {
                path: "my-favorites",
                element: <PrivateRoute><MyFavorites /></PrivateRoute>
            }
        ]
    },
]);

export default Router;