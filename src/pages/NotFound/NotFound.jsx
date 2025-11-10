import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] grid place-items-center text-center">
            <div>
                <img src="https://i.ibb.co.com/p61ptHH3/Not-Found.jpg" alt="404" className="w-3/12 rounded-lg mx-auto"/>
                <h1 className="text-3xl font-extrabold mt-4">Page Not Found</h1>
                <Link to="/" className="btn btn-primary mt-6">Back to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;