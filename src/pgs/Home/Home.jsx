import React, { useRef } from "react";
import "./Home.css";
import Navbar from "../../comps/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../comps/TitleCards/TitleCards";
import Footer from "../../comps/Footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const blockbusterRef = useRef(null);
  const videoVaultRef = useRef(null);
  const upcomingRef = useRef(null);
  const topPicksRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fixedYoutubeId = "_eVva2R9Sx8";

  return (
    <div className="home">
      <Navbar
        scrollToSection={scrollToSection}
        refs={{ blockbusterRef, videoVaultRef, upcomingRef, topPicksRef }}
      />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Jedi Master Obi-Wan Kenobi must save young Leia after she is
            kidnapped, all the while being pursued by Imperial Inquisitors and
            his former Padawan now known as Darth Vader...
          </p>
          <div className="hero-btns">
            <Link to={`/player?videoId=${fixedYoutubeId}`} className="btn">
              <img src={play_icon} alt="" />
              Play
            </Link>

            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <div ref={blockbusterRef}>
          <TitleCards title={"All Time Greats"} category={"top_rated"} />
        </div>
        <div ref={videoVaultRef}>
          <TitleCards title={"Only on Video-Vault"} category={"popular"} />
        </div>

        <div ref={upcomingRef}>
          <TitleCards title={"Upcoming"} category={"upcoming"} />
        </div>

        <div ref={topPicksRef}>
          <TitleCards title={"Top pics for you"} category={"now_playing"} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
