import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios.jsx";
import ReviewTable from "../../../components/ReviewTable.jsx";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading.jsx";

const AdminAllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    // filters & sort state
    const [search, setSearch] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [minRating, setMinRating] = useState("");
    const [sort, setSort] = useState("newest");

    const axios = useAxios();

    // Fetch reviews whenever filter/search/sort changes
    useEffect(() => {
        setLoading(true);

        axios.get("/reviews", {
            params: {
                search,
                location: locationFilter,
                minRating,
                sort
            }
        })
            .then(res => {
                setReviews(res.data);
                setLoading(false);
            });
    }, [axios, search, locationFilter, minRating, sort]);

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
                        const remainingReviews = reviews.filter(r => r._id !== _id);
                        setReviews(remainingReviews);
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

    return (
        <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                All Reviews
            </h2>

            {/* FILTER + SEARCH BAR */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search food or restaurant"
                    className="input input-bordered w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Location filter */}
                <select
                    className="select select-bordered w-full"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                >
                    <option value="">All Locations</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylhet">Sylhet</option>
                </select>

                {/* Rating filter */}
                <select
                    className="select select-bordered w-full"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                >
                    <option value="">Any Rating</option>
                    <option value="5">5</option>
                    <option value="4">4+</option>
                    <option value="3">3+</option>
                </select>

                {/* Sort */}
                <select
                    className="select select-bordered w-full"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="rating_high">Highest Rating</option>
                    <option value="rating_low">Lowest Rating</option>
                </select>
            </div>

            <div>
                {
                    loading ? (
                        <div className="grid place-items-center min-h-36 mt-10">
                            <Loading />
                        </div>
                    ) : reviews.length === 0 ? <div className="flex justify-center items-center">
                        <h3 className="text-3xl font-bold text-[#627382] mt-20 mb-6">Don't have reviews</h3>
                    </div> : <div className="overflow-x-auto bg-base-100 mt-10">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Sl.</th>
                                <th>Image</th>
                                <th>Food Name</th>
                                <th>Rating</th>
                                <th>Restaurant Name</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                reviews.map((review, index) => <ReviewTable
                                                                            key={review._id}
                                                                            index={index}
                                                                            review={review}
                                                                            handleDeleteReview={handleDeleteReview} />
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
};

export default AdminAllReviews;