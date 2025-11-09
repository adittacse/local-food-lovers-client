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
    }, []);

    const handleSearch = () => {
        setLoading(true);
        const text = searchRef.current.value.trim().toLowerCase();

        setTimeout(() => {
            if (text === "") {
                axios.get("/reviews")
                    .then(data => {
                        setReviews(data.data);
                        setLoading(false);
                    })
            } else {
                const result = reviews.filter(review => review.foodName.toLowerCase().includes(text));
                setReviews(result);
                setLoading(false);
            }
        }, 0);
    }

    // if (reviews.length === 0) {
    //     return <p className="mt-6 text-center text-gray-500">No reviews found.</p>;
    // }

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="py-10 px-4 md:px-10 lg:px-20">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-center">All Reviews</h2>
                <div className="flex justify-end gap-4 mt-6">
                    <form className="join">
                        <input ref={searchRef} onChange={handleSearch} type="search" className="input input-bordered join-item" placeholder="Search by food name" />
                        <button className="btn btn-primary join-item" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {
                    reviews.map(review => <ReviewCard key={review._id} review={review} />)
                }
            </div>
        </section>
    );
};

export default AllReviews;
