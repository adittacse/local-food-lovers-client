import { useEffect, useRef, useState } from "react";
import ReviewCard from "../../components/ReviewCard.jsx";
import useAxios from "../../hooks/useAxios.jsx";
import Loading from "../../components/Loading/Loading.jsx";

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();
    const searchRef = useRef(null);

    useEffect(() => {
        axios.get("/reviews")
            .then(data => {
                setReviews(data.data);
                setLoading(false);
            })
    }, [axios]);

    const handleSearch = () => {
        setLoading(true);
        const text = searchRef.current.value.trim().toLowerCase();

        if (text === "") {
            axios.get("/reviews")
                .then(data => {
                    setReviews(data.data);
                    setLoading(false);
                })
        } else {
            // axios.get(`/reviews?foodName=${text}`)
            axios.get("/reviews", {
                params: {
                    foodName: text
                }
            })
                .then(data => {
                    setReviews(data.data);
                    setLoading(false);
                })
        }
    }

    const handleShowAllReviews = () => {
        searchRef.current.value = "";
        setLoading(true);
        axios.get("/reviews")
            .then(data => {
                setReviews(data.data);
                setLoading(false);
            })
    }

    return (
        <div className="py-16">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-center">All Reviews</h2>

                <div className="flex justify-end gap-4 mt-6">
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input ref={searchRef} onChange={handleSearch} type="search" placeholder="Search by food name" />
                    </label>
                </div>
            </div>

            {
                loading ? (
                        <div className="grid place-items-center min-h-36 mt-10">
                            <Loading />
                        </div>
                    )
                    : reviews.length === 0 ? (
                        <div className="flex flex-col justify-center items-center min-h-36">
                            <h3 className="font-bold text-4xl text-[#627382] mt-10 mb-6">No Reviews Found</h3>
                        </div>
                    )
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {
                                reviews.map(review => <ReviewCard key={review._id} review={review} />)
                            }
                        </div>
                    )
            }
        </div>
    );
};

export default AllReviews;
