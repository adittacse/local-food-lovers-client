import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import ReviewCard from "../../components/ReviewCard.jsx";
import useAxios from "../../hooks/useAxios.jsx";
import Loading from "../../components/Loading/Loading.jsx";

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 filters & sort state
    const [search, setSearch] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [minRating, setMinRating] = useState("");
    const [sort, setSort] = useState("newest");

    const axios = useAxios();
    const location = useLocation();

    // 🔁 Fetch reviews whenever filter/search/sort changes
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

    return (
        <div className="py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                All Reviews
            </h2>

            {/* 🔍 FILTER + SEARCH BAR */}
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

            {/* 🔄 CONTENT */}
            {
                loading ? (
                    <div className="grid place-items-center min-h-36 mt-10">
                        <Loading />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="flex flex-col justify-center items-center min-h-36">
                        <h3 className="font-bold text-4xl text-[#627382] mt-10 mb-6">
                            No Reviews Found
                        </h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {reviews.map(review => (
                            <ReviewCard
                                key={review._id}
                                review={review}
                                pathname={location.pathname}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default AllReviews;
