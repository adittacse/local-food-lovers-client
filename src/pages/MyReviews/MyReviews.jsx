import { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import AuthContext from "../../contexts/AuthContext.jsx";
import ReviewTable from "../../components/ReviewTable.jsx";
import Swal from "sweetalert2";

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
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/reviews/${_id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your review has been deleted.",
                            icon: "success"
                        });
                        const remainingReviews = data.filter(r => r._id !== _id);
                        setData(remainingReviews);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Failed to delete. Please try again."
                        });
                    });
            }
        });
    };

    if (loading) {
        return <Loading />
    }

    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-center">My Reviews</h2>

            <div className="overflow-x-auto bg-base-100 mt-10">
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
