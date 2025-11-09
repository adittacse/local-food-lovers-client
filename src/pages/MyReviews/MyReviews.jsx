import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";
import useAxios from "../../hooks/useAxios.jsx";
import ReviewCard from "../../components/ReviewCard.jsx";

const MyReviews = () => {
    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext);
    const axios = useAxios();

    useEffect(() => {
        if (user) {
            axios.get(`/reviews?reviewerEmail=${user.email}`)
                .then(data => {
                    setData(data.data);
                });
        }
    }, [user]);

    return (
        <div className="py-20">
            <h1 className="text-3xl font-bold text-center mb-6">My Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center mx-auto">
                {
                    data.map(review => <ReviewCard key={review._id} review={review} />)
                }
            </div>
        </div>
    );
};

export default MyReviews;