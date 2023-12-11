import axios from "axios";

const KEY = process.env.REACT_APP_OMDB_API_KEY;
const OMDB_API = `http://www.omdbapi.com/?apikey=${KEY}&`;
const TMDB_API = `https://api.themoviedb.org/3/${KEY}$`

export const fullTextSearch = async (text) => {
  const response = await axios.get(`${OMDB_API}s=${text}`);
  return response.data;
};

export const findMovieById = async (movieID) => {
  const response = await axios.get(`${OMDB_API}i=${movieID}`);
  return response.data;
};


export const findTopRated = async () => {
  const response = await axios.get(`${TMDB_API}/search/movie?include_adult=false&language=en-US&page=1`)
  return response.data
}