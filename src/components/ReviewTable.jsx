import { Link } from "react-router";

const ReviewTable = ({ review, handleEditReview, handleDeleteReview }) => {
    const { _id, photo, foodName, rating, restaurantName, location } = review;

    return (
        <tr>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                        <img src={photo} alt={foodName} />
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold">{foodName}</div>
            </td>
            <td>{rating}</td>
            <td>{restaurantName}</td>
            <td>{location}</td>
            <th>
                <Link to={`/reviews/${_id}`} className="btn btn-info mr-2">View Details</Link>
                <button onClick={() => handleEditReview(_id)} className="btn btn-primary mr-2">Edit</button>
                <button onClick={() => handleDeleteReview(_id)} className="btn btn-error">Delete</button>
            </th>
        </tr>
    );
};

export default ReviewTable;