import axios from "axios";

const KEY = process.env.REACT_APP_OMDB_API_KEY;
const OMDB_API = `http://www.omdbapi.com/?apikey=${KEY}&`;
const OMDB_IMAGE_URL = `http://img.omdbapi.com/?apikey=${KEY}&`;

export const fullTextSearch = async (text) => {
  const response = await axios.get(`${OMDB_API}s=${text}`);
  return response.data;
};

export const findMovieById = async (movieID) => {
  const response = await axios.get(`${OMDB_API}i=${movieID}`);
  return response.data;
};
