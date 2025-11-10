import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import ReviewCard from "../../components/ReviewCard.jsx";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {
                data.map(r => (
                    <ReviewCard key={r._id} review={r} />
                ))
            }
        </div>
    );
};

export default FeaturedReviews;