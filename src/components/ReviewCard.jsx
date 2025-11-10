import { Link } from "react-router";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Heart } from "lucide-react";
import useAxios from "../hooks/useAxios.jsx";
import Swal from "sweetalert2";
import {useContext, useState} from "react";
import AuthContext from "../contexts/AuthContext.jsx";

const ReviewCard = ({ review }) => {
    const { _id, photo, foodName, restaurantName, location, reviewerName, reviewerEmail, rating } = review;
    const axios = useAxios();
    const { user } = useContext(AuthContext);
    const [isFav, setIsFav] = useState(false);

    // check if already in favorite list for red heart
    // useEffect(() => {
    //     axios.get("/favorites")
    // }, []);

    // rating icon
    const full = Math.max(0, Math.min(5, Math.floor(rating)));
    const hasHalf = rating - full >= 0.5 && full < 5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    const handleFavorite = () => {
        const favoriteReview = {
            reviewId: _id,
            photo,
            foodName,
            restaurantName,
            location,
            reviewerName,
            reviewerEmail,
            favoriteUserEmail: user?.email,
            rating
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

    const handleUnfavorite = (_id) => {
        console.log(_id);
        axios.delete(`/favorites/${_id}`, {
            method: "DELETE"
        })
            .then(data => {
                console.log(data.data);
                // if ()
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
                        {/*<button onClick={handleFavorite} className="btn">*/}
                        {/*    <Heart />*/}
                        {/*</button>*/}
                        <button
                            onClick={isFav ? () => handleUnfavorite(_id) : handleFavorite}
                            className="btn btn-ghost btn-circle"
                            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                            title={isFav ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Heart
                                className={isFav ? "w-5 h-5 text-red-500" : "w-5 h-5"}
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
                    <Link to={`/reviews/${_id}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;