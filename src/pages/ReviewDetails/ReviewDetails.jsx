import { useLoaderData } from "react-router";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const ReviewDetails = () => {
    const data = useLoaderData();
    const { photo, foodName, restaurantName, location, rating, review, reviewerName, date } = data;

    // rating icon
    const full = Math.max(0, Math.min(5, Math.floor(rating)));
    const hasHalf = rating - full >= 0.5 && full < 5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    return (
        <article className="flex flex-col md:flex-row gap-6 items-center mx-auto py-16">
            <figure>
                <img src={photo} alt={foodName} className="rounded-xl lg:w-11/12 h-96"/>
            </figure>

            <div className="flex flex-col gap-6">
                <div className="card bg-white shadow-lg p-3">
                    <h1 className="text-2xl font-bold mb-2">{foodName}</h1>
                    <p className="opacity-80 mb-2">{restaurantName} • {location}</p>
                    <hr className="mb-2" />
                    <div className="flex items-center gap-2">
                        Rating:
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
                </div>

                <div className="card bg-white shadow-lg p-3">
                    <p className="text-sm opacity-70">Reviewed by <strong>{reviewerName}</strong> on {new Date(date).toLocaleDateString()}</p>
                </div>

                <div className="card bg-white shadow-lg p-3">
                    <p><span className="font-medium">Review:</span> {review}</p>
                </div>
            </div>
        </article>
    );
};

export default ReviewDetails;