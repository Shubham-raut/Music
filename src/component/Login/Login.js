import React from "react";
import { accessUrl } from "../../config/spotify";
import logo from "../../assets/Images/Spotify_Logo.png";

function Login() {
  return (
    <div className="login">
      <img src={logo} alt="Spotify Logo" />
      <a href={accessUrl}>LOGIN TO SPOTIFY</a>
    </div>
  );
}

export default Login;
