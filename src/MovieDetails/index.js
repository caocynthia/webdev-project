import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as reviewClient from "../reviews/client";
import * as client from "../users/client";
import { useSessionStorage } from "usehooks-ts";

function MovieItem() {
  const { movieId } = useParams();
  const [user, setUser] = useSessionStorage("currentUser");
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);

  const [movieReviews, setMovieReviews] = useState([]);

  // const [liked, setLiked] = useState(user.likedMovies.includes(movieId));
  // const liked = user.likedMovies.includes(movieId);

  const handleLike = async () => {
    try {
      const updatedLikedMovies =
        user.likedMovies.push(movieId);
      setUser({ ...user, likedMovies: updatedLikedMovies })
      const response = await client.updateUser(user);
    } catch (error) {
      console.error("Error liking movie:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const updatedLikedMovies = user.likedMovies.filter((id) => id !== movieId);
      const updatedUser = await client.updateUser({ ...user, likedMovies: updatedLikedMovies });

      setUser(updatedUser);
      // console.log({ ...user, likedMovies: updatedLikedMovies });
      // console.log(user);

    } catch (error) {
      console.error("Error unliking movie:", error);
    }
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
    },
  };

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    );
    const data = await response.json();
    console.log(data);
    setMovie(data);
  };

  const fetchMovieReviews = async () => {
    const reviews = await reviewClient.findAllReviews();
    const filteredReviews = reviews.filter(
      (review) => review.movieId === movieId
    );
    setMovieReviews(filteredReviews);
  };

  useEffect(() => {
    fetchMovies();
    fetchMovieReviews();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const [newReview, setNewReview] = useState({
    userId: "",
    username: "",
    movieId: "",
    movieTitle: "",
    review: "",
  });

  const createReview = async () => {
    try {
      const review = await reviewClient.createReview(newReview);
      setMovieReviews([...movieReviews, review]);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="mb-4">
        <div
          className="text-decoration-underline text-primary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </div>
      </div>

      {movie && (
        <div className="d-flex flex-column flex-md-row gap-4 w-100">
          <div className="d-flex flex-column gap-4 pr-4">
            <img
              className="movie-poster col-12 col-sm-8 col-md-12 "
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={"Poster of " + movie.title}
            ></img>

            {user && (
              <div>
                {user.likedMovies.includes(movieId) ?
                  // { liked ? 
                  <button
                    className="btn btn-primary"
                    onClick={handleUnlike}
                  >
                    <i className="bi bi-heart-fill"></i> Liked
                  </button>
                  :
                  <button
                    className="btn btn-primary"
                    onClick={handleLike}
                  >
                    <i className="bi bi-heart"></i> Like
                  </button>}
              </div>
            )}
           
          </div>
          <div className="movie-item-body d-flex flex-column gap-4 w-100">
            {/* Movie Info */}
            <div>
              <h1>
                {movie.title} | {movie.runtime} min
              </h1>
              <div>{movie.overview}</div>
              <br />
              <h4>Rating: {movie.vote_average}</h4>
            </div>

            {/* Reviews */}
            <div className="d-flex flex-column mt-4">
              <div>
                <h1>Reviews</h1>
              </div>
              {user && (
                <div className="d-flex flex-column gap-2">
                  {isEditing === false && (
                    <div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary"
                      >
                        + Add a Review
                      </button>
                    </div>
                  )}
                  {isEditing === true && (
                    <div className="d-flex flex-column justify-content-right mb-4 gap-2">
                      <textarea
                        className="form-control"
                        value={newReview.review}
                        onChange={(e) =>
                          setNewReview({
                            ...newReview,
                            userId: user._id,
                            username: user.username,
                            movieId: movie.id,
                            movieTitle: movie.title,
                            review: e.target.value,
                          })
                        }
                      ></textarea>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={createReview}
                        >
                          Post Review
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <ul className="list-group">
                {movieReviews.map((review, index) => (
                  <li
                    key={index}
                    className="list-group-item card review-card row mt-2 gap-4 g-0"
                  >
                    <h3>{review.username}</h3>
                    <div>{review.review}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieItem;

// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import * as reviewClient from "../reviews/client";
// import { useSessionStorage } from "usehooks-ts";

// function MovieItem() {
//   const { movieId, userId } = useParams();
//   const [movie, setMovie] = useState([]);
//   const [review, setReview] = useState("");
//   const [movieReviews, setMovieReviews] = useState([]);
//   const [liked, setLiked] = useState([]);
//   const [user, setUser] = useSessionStorage("currentUser");

//   useEffect(() => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
//       },
//     };

//     fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
//       options
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setMovie(data);
//       })
//       .catch((err) => console.error(err));

//     const fetchMovieReviews = async () => {
//       const reviews = await reviewClient.findAllReviews();
//       const filteredReviews = reviews.filter(
//         (review) => review.movieId === movieId
//       );
//       // Check if the user has liked this movie
//       setLiked(user.likedMovies.includes(movieId));
//       setMovieReviews(filteredReviews);
//     };

//     fetchMovieReviews();
//   }, [user, user.likedMovies, user._id, movieId, movie]);

//   const navigate = useNavigate();

//   return (
//     <div className="container p-0">
//       <div className="mb-4">
//         <div
//           className="text-decoration-underline text-primary"
//           onClick={() => navigate(-1)}
//         >
//           ← Back
//         </div>
//       </div>

//       {movie && (
//         <div className="d-flex flex-column flex-md-row gap-4 w-100">
//           <div className="pr-4">
//             <img
//               className="movie-poster"
//               src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//               alt={"Poster of " + movie.Title}
//             ></img>
//             {liked ? (
//                     <button className="btn btn-primary" onClick={handleUnlike}><i className="bi bi-heart-fill"></i>Liked</button>
//                 ):(
//                     <button className="btn btn-primary" onClick={handleLike}><i className="bi bi-heart"></i>Like </button>
//                 )}
//           </div>
//           <div className="movie-item-body d-flex flex-column gap-4 w-100">
//             {/* Movie Info */}
//             <div>
//               <h1>{movie.title} | {movie.runtime} min</h1>
//               <div>{movie.overview}</div>
//               <br />
//               <h4>Rating: {movie.vote_average}</h4>
//             </div>

//             {/* Reviews */}
//             <div className="d-flex flex-column gap-2">
//               <div>
//                 <h1>Reviews</h1>
//               </div>
//               {userId && (
//                 <div className="review-textbox">
//                   <textarea
//                     value={review}
//                     onChange={(e) => setReview(e.target.value)}
//                   ></textarea>
//                   <button onClick={makeReview} className="btn btn-primary">
//                     + Add a Review
//                   </button>
//                 </div>
//               )}
//               <ul className="list-group">
//                 {movieReviews.map((review, index) => (
//                   <li
//                     key={index}
//                     className="list-group-item card review-card row mt-2 gap-4 g-0"
//                   >
//                     <h3>{review.username}</h3>
//                     <div>{review.review}</div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MovieItem;
