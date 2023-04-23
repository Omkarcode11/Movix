import React, { useEffect, useState } from "react";
import "./HeroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../components/lazyLoadImage/Img";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

function HeroBanner() {
  const { url } = useSelector((state) => state.home);
  const [search, setSearch] = useState("");
  const [background, setBackGround] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/popular");

  const searchHandler = (e) => {
    if (e.key === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
    }
  };
  // console.log(url);
  useEffect(() => {
    const rmNum = Math.floor(Math.random() * 20);
    const bg = url.backdrop + data?.results[rmNum]?.backdrop_path;
    setBackGround(bg);
  }, [data]);
  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of Movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv Show...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={searchHandler}
            />
            <button onClick={() => navigate(`/search/${search}`)}>
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;
