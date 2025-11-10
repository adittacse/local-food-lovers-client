import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import AuthContext from "../../contexts/AuthContext.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import ReviewCard from "../../components/ReviewCard.jsx";

const MyFavorites = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            axiosSecure.get(`/favorites?reviewerEmail=${user.email}`)
                .then(data => {
                    setData(data.data);
                    setLoading(false);
                })
        }
    }, [user]);

    const unfavoriteReviewId = (reviewId) => {
        const remainingFavoriteReviews = data.filter(reviews => reviews._id !== reviewId);
        setData(remainingFavoriteReviews);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="py-20">
            <h2 className="text-3xl font-bold text-center mb-6">My Favourites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {
                    data.length === 0 ? (
                            <div className="flex flex-col justify-center items-center min-h-36">
                                <h3 className="font-bold text-4xl text-[#627382] mt-10 mb-6">No Favorite Review Found</h3>
                            </div>
                        ) : (
                            data.map(review => <ReviewCard key={review._id}
                                                           unfavoriteReviewId={unfavoriteReviewId}
                                                           review={{ ...review, reviewId: review._id || review.reviewId }} />)
                        )
                }
            </div>
        </div>
    );
};

export default MyFavorites;