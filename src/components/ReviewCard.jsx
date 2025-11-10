import { Link } from "react-router";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Heart } from "lucide-react";
import useAxios from "../hooks/useAxios.jsx";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const ReviewCard = ({ review }) => {
    const { photo, foodName, restaurantName, location, reviewerName, rating } = review;
    const reviewId = review.reviewId || review._id;
    const axios = useAxios();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [isFav, setIsFav] = useState(false);

    // default check if already in favorite list for red heart
    useEffect(() => {
        if (user) {
            axiosSecure.get("/favorites/exists", {
                params: {
                    reviewId: reviewId
                }
            })
                .then(data => {
                    setIsFav(data.data);
                })
        }
    }, [user, reviewId, axiosSecure]);

    // rating icon
    const full = Math.max(0, Math.min(5, Math.floor(rating)));
    const hasHalf = rating - full >= 0.5 && full < 5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    const handleFavorite = () => {
        const favoriteReview = {
            reviewId: reviewId,
            favoriteUserEmail: user?.email
        }

        axios.post("/favorites", favoriteReview)
            .then(data => {
                if (data.data.duplicated) {
                    Swal.fire({
                        icon: "error",
                        title: "Can't Favorite Twice",
                        text: `${data.data?.message}` || "Something went wrong",
                    });
                }
                else if (data.data.insertedId) {
                    setIsFav(true);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Added To Favorites",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

    const handleUnfavorite = () => {
        axios.delete(`/favorites/${reviewId}`, {
            method: "DELETE"
        })
            .then(data => {
                if (data.data.deletedCount) {
                    setIsFav(false);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Removed From Favorites",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="card bg-base-200 shadow-lg">
            <figure>
                <img src={photo} alt={foodName} className="w-full h-48 object-cover"/>
            </figure>
            <div className="card-body">
                <div className="flex items-center justify-between gap-2">
                        <div>
                            <h3 className="card-title text-lg">{foodName}</h3>
                            <p className="text-sm opacity-80">{restaurantName} • {location}</p>
                        </div>
                        <button onClick={isFav ? handleUnfavorite : handleFavorite}
                            className="btn btn-ghost btn-circle"
                            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                            title={isFav ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Heart className={isFav ? "w-5 h-5 text-red-500" : "w-5 h-5"}
                                fill={isFav ? "currentColor" : "none"}
                            />
                        </button>
                </div>
                <p>Reviewer Name: <span className="font-medium">{reviewerName}</span></p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">Rating:
                        {
                            Array.from({ length: full }).map((_, i) => <FaStar key={`f${i}`} className="text-xl text-warning" />)
                        }
                        {
                            hasHalf && <FaStarHalfAlt className="text-xl text-warning" />
                        }
                        {
                            Array.from({ length: empty }).map((_, i) => <FaRegStar key={`e${i}`} className="text-xl text-warning" />)
                        }
                        <span className="text-sm opacity-80 font-medium">{rating}</span>
                    </div>
                    <Link to={`/reviews/${reviewId}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;