import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

export const REVIEWS_API = `${process.env.REACT_APP_API_URL}/api`;

export const findAllReviews = async () => {
  const response = await request.get(`${REVIEWS_API}/reviews`);
  return response.data;
};
export const createUserReviewsMovie = (userId, movieId, review) => {
  const response = request.post(
    `${REVIEWS_API}/users/${userId}/reviews/${movieId}`,
    { userId, movieId, review }
  );
  return response.data;
};
export const findMoviesUserReviews = (userId) => {
  const response = request.get(`${REVIEWS_API}/users/${userId}/reviews`, {
    userId,
  });
  return response.data;
};
export const findUsersWhoReviewsMovie = (movieId) => {
  const response = request.get(`${REVIEWS_API}/movies/${movieId}/reviews`);
  return response.data;
};
export const deleteUserReview = (userId, movieId) => {
  const response = request.delete(
    `${REVIEWS_API}/users/${userId}/reviews/${movieId}`
  );
  return response.data;
};
