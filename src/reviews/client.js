import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

export const REVIEWS_API = `${process.env.REACT_APP_API_URL}/api`;

export const findAllReviews = async () => {
  const response = await request.get(`${REVIEWS_API}/reviews`);
  return response.data;
};

export const createReview = async (userId, movieId, review) => {
  const response = await request.post(
    `${REVIEWS_API}/users/${userId}/reviews/${movieId}`,
    { userId, movieId, review }
  );
  return response.data;
};

export const findReviewByUser = async (userId) => {
  const response = await request.get(`${REVIEWS_API}/reviews/user/${userId}`, {
    userId,
  });
  return response.data;
};

export const findReviewByMovie = async (movieId) => {
  const response = await request.get(`${REVIEWS_API}/reviews/movie/${movieId}`);
  return response.data;
};

export const deleteReview = async (userId, movieId) => {
  const response = await request.delete(
    `${REVIEWS_API}/users/${userId}/reviews/${movieId}`
  );
  return response.data;
};
