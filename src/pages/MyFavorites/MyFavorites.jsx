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
            axiosSecure.get(`/favorites?favoriteUserEmail=${user.email}`)
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
        <div className="py-16">
            <h2 className="text-3xl font-bold text-center">My Favourites</h2>

            {
                data.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <h3 className="text-3xl font-bold text-[#627382] mt-20 mb-6">No Favorite Review Found</h3>
                        </div>
                    ) : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                            {
                                data.map(review => <ReviewCard key={review._id}
                                                               unfavoriteReviewId={unfavoriteReviewId}
                                                               review={{ ...review, reviewId: review._id || review.reviewId }} />)
                            }
                        </div>
            }
        </div>
    );
};

export default MyFavorites;