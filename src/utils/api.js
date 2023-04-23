import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWZjY2U1OTliYzhiYTk1YmVkZTcxNWEzYzI0ZTJmMSIsInN1YiI6IjY0M2U3NmJhZTBjYTdmMDMxMzA3MDg3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bp88IUqmLQJeQuY9KV9DIGaMiG-zBs_jh1bgELWCIQw";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
