import { Link } from "react-router";

const LatestReviews = () => {
    return (
        <section className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Food Stories</h2>
            <p className="opacity-80 mt-2">
                Discover what food lovers are sharing right now.
            </p>

            <Link to="/all-reviews" className="btn btn-outline mt-6">
                Browse Latest Reviews
            </Link>
        </section>
    );
};

export default LatestReviews;
