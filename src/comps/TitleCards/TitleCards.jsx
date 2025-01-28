import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2JiYjllM2Y3Y2MyNDc2NDhkYzQwNTcyNDM0YzdmMyIsIm5iZiI6MTczNzg4NTI3My40NTcsInN1YiI6IjY3OTYwNjU5ZGNiN2FiY2I1NjE4NWYyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGVTi_5cjdcu-jkXU-e0Ey5q5vPP8OWBEGyUIx7ecv4",
    },
  };

  

  const handleWheel = (event) => {
    event.preventDefault(0);
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(
      `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Video-Vault"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="" className="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
