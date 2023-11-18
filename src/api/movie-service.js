import axios from "axios";

const KEY = process.env.REACT_APP_OMDB_API_KEY;
const OMDB_API = `http://www.omdbapi.com/?apikey=${KEY}&`;
const OMDB_IMAGE_URL = `http://img.omdbapi.com/?apikey=${KEY}&`;

// export const posterImageURL = (poster) => `${OMDB_IMAGE_URL}`;

export const fullTextSearch = async (text) => {
  const response = await axios.get(
    `${OMDB_API}/search/verbose?query=${text}&apikey=${KEY}`
  );
  return response.data;
};
