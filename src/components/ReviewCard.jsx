import { Link } from "react-router";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Heart } from "lucide-react";
import useAxios from "../hooks/useAxios.jsx";
import Swal from "sweetalert2";

const ReviewCard = ({ review }) => {
    const { _id, photo, foodName, restaurantName, location, reviewerName, rating } = review;
    const axios = useAxios();

    // rating icon
    const full = Math.max(0, Math.min(5, Math.floor(rating)));
    const hasHalf = rating - full >= 0.5 && full < 5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    const handleFavorite = () => {
        const favoriteReview = {
            ...review
        }

        axios.post("/favorites", favoriteReview)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Added To Favorites",
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
                        <button onClick={handleFavorite} className="btn">
                            <Heart />
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
                    <Link to={`/reviews/${_id}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;