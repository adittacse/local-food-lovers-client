import { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import AuthContext from "../../contexts/AuthContext.jsx";
import ReviewTable from "../../components/ReviewTable.jsx";

const MyReviews = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const axios = useAxios();

    useEffect(() => {
        if (user) {
            axios.get(`/reviews?reviewerEmail=${user.email}`)
                .then(data => {
                    setData(data.data);
                    setLoading(false);
                })
        }
    }, [user, axios]);

    const handleDeleteReview = (_id) => {
        console.log("deleted id:", _id);

        // axios.delete(`/reviews/${id}`)
        //     .then(() => {
        //         // লোকাল স্টেট আপডেট
        //         setData(prev => prev.filter(r => r._id !== id));
        //     })
        //     .catch(() => {
        //         alert("Failed to delete. Please try again.");
        //     });
    };

    if (loading) {
        return <Loading />
    }

    return (
        <section className="py-20">
            <h2 className="text-3xl font-bold text-center mb-6">My Reviews</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Food Name</th>
                        <th>Rating</th>
                        <th>Restaurant Name</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(review => <ReviewTable key={review._id}
                                                            review={review}
                                                            handleDeleteReview={handleDeleteReview} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyReviews;
