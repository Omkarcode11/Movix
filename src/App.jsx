import { useEffect } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfig, getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Error from "./pages/404/Error";

function App() {
  const url = useSelector((state) => state.home.url);
  const dispatch = useDispatch();
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfig(url));
    });
  };

  const genresCall =async ()=>{
    let promises = []
    let endPoints = ['tv','movie']
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)

    // console.log(data)
    data.map(({genres})=>{
                  return genres.map((item)=>(allGenres[item.id] = item.name))
    })
    dispatch(getGenres(allGenres))
    // console.log(allGenres)

  }

  useEffect(() => {
    fetchApiConfig();
    genresCall()
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<Error />} />
          <Route path="/search/:query" element={<SearchResult />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
