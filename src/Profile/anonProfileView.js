import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as reviewsClient from "../reviews/client";
import * as usersClient from "../users/client";

function AnonProfileView() {
  const { id } = useParams();
  const [account, setAccount] = useState();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // const findUser = async (id) => {
    //   const user = await usersClient.findUserById(id);
    //   setAccount(user);
    // };
    // findUser(id);

    const findReviewsByUser = async (id) => {
      const user = await usersClient.findUserById(id);
      setAccount(user);
      try {
        let reviews = await reviewsClient.findReviewByUser(user._id);
        setReviews(reviews);
      } catch (err) {
        console.log(err);
      }
    };
    findReviewsByUser(id);
  }, [id]);

  return (
    <>
      <div className="d-flex flex-row justify-content-between mb-4">
        <h1>Profile</h1>
      </div>
      {account && (
        <div className="row col-sm gap-4">
          <div className="col-md-3 col-xl-2 d-flex flex-column gap-2">
            {/* <Account /> */}

            <div>
              <h3>{account.username}</h3>

              <h5>
                {account.firstName} {account.lastName}
              </h5>

              {account && account.role === "MODERATOR" && <p>{account.role}</p>}
            </div>
          </div>
          <div className="col d-flex flex-column gap-4">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex flex-column gap-2">
                <h5>My Reviews</h5>
                {reviews.length === 0 && (
                  <div>{account.username} has not written any reviews yet</div>
                )}
                {reviews.map((review) => (
                  <div key={review._id} className="card w-100">
                    <div className="d-flex justify-content-between">
                      <Link to={"/MovieItem/" + review.movieId}>
                        <h6>{review.movieTitle}</h6>
                      </Link>
                    </div>

                    <div className="mt-3">{review.review}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default AnonProfileView;
