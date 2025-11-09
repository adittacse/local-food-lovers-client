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

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <h1>My Favourites page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {
                    data.map(review => <ReviewCard key={review._id} review={review} />)
                }
            </div>
        </div>
    );
};

export default MyFavorites;