import { useContext, useState } from "react";
import useAxios from "../../hooks/useAxios.jsx";
import AuthContext from "../../contexts/AuthContext.jsx";
import { Link } from "react-router";
import { MoveLeft } from "lucide-react";
import Swal from "sweetalert2";

export default function AddReview() {
    const [submitting, setSubmitting] = useState(false);
    const { user } = useContext(AuthContext);
    const axios = useAxios();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const foodName = e.target.foodName.value;
        const photo = e.target.foodImageURL.value;
        const restaurantName = e.target.restaurantName.value;
        const location = e.target.location.value;
        const rating = e.target.rating.value;
        const review = e.target.review.value;
        const reviewerName = e.target.name.value;
        const reviewerEmail = e.target.email.value;
        const reviewerPhotoURL = e.target.photoURL.value;
        const date = new Date().toISOString();

        const newReview = {
            foodName,
            photo,
            restaurantName,
            location,
            rating,
            review,
            reviewerName,
            reviewerEmail,
            reviewerPhotoURL,
            date
        }

        setSubmitting(true);
        try {
            await axios.post("/reviews", newReview);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review Submitted",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message}` || "Failed",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-20">
            <h4 className="text-[20px] font-medium text-secondary mb-4">
                <Link className="flex items-center justify-center gap-2" to="/my-reviews"><MoveLeft /> Back To My Reviews</Link>
            </h4>
            <h2 className="text-2xl font-bold text-center mb-10">Add A <span className="primary-text">Review</span></h2>
            <div className="card bg-base-100 w-full max-w-3xl shrink-0 shadow-2xl mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            {/* 2-column row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mb-5">
                                {/* food name */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Food Name</span>
                                    </label>
                                    <input name="foodName" type="text" className="input input-bordered w-full"
                                           placeholder="Fish burger" required />
                                </div>

                                {/* restaurant name */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Restaurant Name</span>
                                    </label>
                                    <input name="restaurantName" type="text" className="input input-bordered w-full"
                                           placeholder="Burger King" required />
                                </div>
                            </div>

                            {/* food image URL */}
                            <div className="form-control w-full mb-5">
                                <label className="label">
                                    <span className="label-text text-secondary">Food Image URL</span>
                                </label>
                                <input name="foodImageURL" type="text" className="input input-bordered w-full" placeholder="https://..."/>
                            </div>

                            {/* 2-column row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mb-5">
                                {/* rating */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Rating</span>
                                    </label>
                                    <input name="rating" type="number" step="0.5" min="0" max="5"
                                           className="input input-bordered w-full" placeholder="Star Rating (0-5)" required />
                                </div>

                                {/* location */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Restaurant Location</span>
                                    </label>
                                    <input name="location" type="text" className="input input-bordered w-full"
                                           placeholder="Chittagong" required />
                                </div>
                            </div>

                            {/* 2-column row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mb-5">
                                {/* your name */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Your Name</span>
                                    </label>
                                    <input name="name" type="text" className="input input-bordered w-full"
                                           value={user?.displayName} disabled />
                                </div>

                                {/* your email */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Your Email</span>
                                    </label>
                                    <input name="email" type="email" className="input input-bordered w-full"
                                           value={user?.email} disabled />
                                </div>
                            </div>

                            {/* your image url */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-secondary">Your Image URL</span>
                                </label>
                                <input name="photoURL" type="text" className="input input-bordered w-full"
                                       value={user?.photoURL} disabled />
                            </div>

                            {/* review */}
                            <div className="form-control w-full mb-5">
                                <legend className="label text-secondary">Your Review</legend>
                                <textarea name="review" className="textarea w-full h-24"
                                          placeholder="I really love their foods. Specially their fish burger." required></textarea>
                            </div>

                            <button disabled={submitting} className="btn btn-primary">
                                {submitting ? "Submitting..." : "Submit Review"}
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}
