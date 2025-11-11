import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import ReviewCard from "../../components/ReviewCard.jsx";
import { Link } from "react-router";

const FeaturedReviews = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    useEffect(() => {
        axios.get("/reviews/featured")
            .then(data => {
                setData(data.data);
                setLoading(false);
            })
    }, [axios]);

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center">Featured Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {
                    data.map(review => <ReviewCard key={review._id} review={review} />)
                }
            </div>
            <div className="flex justify-center mt-6">
                <Link to="/all-reviews" className="btn btn-primary mt-6">Show All Reviews</Link>
            </div>
        </section>
    );
};

export default FeaturedReviews;