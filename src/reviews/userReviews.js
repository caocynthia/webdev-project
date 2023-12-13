import * as client from "./client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [user] = useSessionStorage("currentUser");
  const [currentReview, setCurrentReview] = useState();
  const [isEditing, setIsEditing] = useState("");

  useEffect(() => {
    const findReviewsByUser = async () => {
      try {
        let reviews = await client.findReviewByUser(user._id);
        setReviews(reviews);
      } catch (err) {
        console.log(err);
      }
    };
    findReviewsByUser();
  }, [user._id]);

  const editReview = async (reviewId) => {
    try {
      const r = await client.findReviewById(reviewId);
      setCurrentReview(r);
      setIsEditing(reviewId);
    } catch (err) {
      console.log(err);
    }
  };

  const updateReview = async () => {
    try {
      await client.updateReview(currentReview);
      setReviews(
        reviews.map((r) => (r._id === currentReview._id ? currentReview : r))
      );
      setIsEditing("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await client.deleteReview(reviewId);
      setReviews(reviews.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <h5>My Reviews</h5>
        {reviews.length === 0 && (
          <div>You haven't written any reviews yet!</div>
        )}
        {reviews.map((review) => (
          <div key={review._id} className="card w-100">
            <div className="d-flex justify-content-between">
              <Link to={"/MovieItem/" + review.movieId}>
                <h6>{review.movieTitle}</h6>
              </Link>
              <div className="d-flex gap-2">
                <div className="btn btn-primary">
                  <i
                    className="bi bi-pencil fs-6"
                    onClick={() => editReview(review._id)}
                  ></i>
                </div>
                <div className="btn btn-primary">
                  <i
                    className="bi bi-trash fs-6"
                    onClick={() => deleteReview(review._id)}
                  ></i>
                </div>
              </div>
            </div>

            {isEditing !== review._id && (
              <div className="mt-3">{review.review}</div>
            )}
            {isEditing === review._id && (
              <div className="d-flex justify-content-right gap-2 mt-3">
                <input
                  className="form-control"
                  value={currentReview.review}
                  onChange={(e) =>
                    setCurrentReview({
                      ...currentReview,
                      review: e.target.value,
                    })
                  }
                />
                <button className="btn btn-primary" onClick={updateReview}>
                  Done
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
export default UserReviews;
