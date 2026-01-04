import { Link } from "react-router";
import { format } from "date-fns";

const ReviewTable = ({ index, review, handleDeleteReview }) => {
    const { _id, photo, foodName, rating, restaurantName, date, location } = review;

    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                        <img src={photo} alt={foodName} />
                    </div>
                </div>
            </td>
            <td>
                <Link to={`/reviews/${_id}`} className="font-bold">{foodName}</Link>
            </td>
            <td>{rating}</td>
            <td>{restaurantName}</td>
            <td>{format(new Date(date), "dd MMM yyyy, h:mm a")}</td>
            <td>{location}</td>
            <th>
                <Link to={`/reviews/${_id}`} className="btn btn-secondary mr-2">View</Link>
                <Link to={`/dashboard/edit-review/${_id}`} className="btn btn-primary mr-2">Edit</Link>
                <button onClick={() => handleDeleteReview(_id)} className="btn btn-error">Delete</button>
            </th>
        </tr>
    );
};

export default ReviewTable;