import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

const REVIEWS_API = "http://localhost:4000/api"

export const findAllReviews = async() => {
    const response = await axios.get(`${REVIEWS_API}/reviews`);
    return response.data
}
export const createUserReviewsMovie = (userId, movieId, review) => {
    const response = axios.post(`${REVIEWS_API}/users/${userId}/reviews/${movieId}`, {userId, movieId, review});
    return response.data;
}
export const findMoviesUserReviews = (userId) => {
    const response = axios.get(`${REVIEWS_API}/users/${userId}/reviews`, {userId});
    return response.data;
}
export const findUsersWhoReviewsMovie = (movieId) => {
    const response = axios.get(`${REVIEWS_API}/movies/${movieId}/reviews`);
    return response.data;
}