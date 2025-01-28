import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import profile_icon from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useNavigate } from "react-router-dom";


const Navbar = ({ scrollToSection, refs }) => {
  const navRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  function handleLogout(e) {
    e.preventDefault();

    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}/>
        <ul>
          <li onClick={() => scrollToSection(refs.blockbusterRef)}>
            All Time Greats
          </li>
          <li onClick={() => scrollToSection(refs.videoVaultRef)}>
            Only on Video-Vault
          </li>
          <li onClick={() => scrollToSection(refs.upcomingRef)}>Upcoming</li>
          <li onClick={() => scrollToSection(refs.topPicksRef)}>
            Top pics for you
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        
        <p>Choose a movie and relax after a long day...</p>
        
      </div>

      <div className="navbar-profile">
        <img src={profile_icon} alt="" className="profile" />
        <img src={caret_icon} alt="" />
        <div className="dropdown">
          <p>Switch User</p>
          <p>Help & FAQ</p>
          <p onClick={handleLogout}>Sign Out</p>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
