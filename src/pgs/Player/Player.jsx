import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); 
  const queryParams = new URLSearchParams(location.search);
  const buttonVideoId = queryParams.get("videoId"); 

  const [apiVideoId, setApiVideoId] = useState(""); 

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2JiYjllM2Y3Y2MyNDc2NDhkYzQwNTcyNDM0YzdmMyIsIm5iZiI6MTczNzg4NTI3My40NTcsInN1YiI6IjY3OTYwNjU5ZGNiN2FiY2I1NjE4NWYyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGVTi_5cjdcu-jkXU-e0Ey5q5vPP8OWBEGyUIx7ecv4"
    }
  };

  
  useEffect(() => {
    if (id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.results && res.results.length > 0) {
            setApiVideoId(res.results[0].key);
          }
        })
        .catch((err) => console.error("Error fetching video:", err));
    }
  }, [id]);

  
  const finalVideoId = apiVideoId || buttonVideoId;

  console.log("API Video ID:", apiVideoId);
  console.log("Button Video ID:", buttonVideoId);
  console.log("Final Video ID:", finalVideoId);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
      {finalVideoId ? (
        <iframe
          width="95%"
          height="95%"
          src={`https://www.youtube.com/embed/${finalVideoId}?autoplay=1&rel=0`}
          title="Movie Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Player;