import React from "react";
import "./Login.css";
import SocialFollow from "../SocialFollow/SocialFollow";
import { accessUrl } from "../../config/spotify";

function Login() {
  return (
    <div>
      <div className="login">
        <h3 className="Header">SPOTIFY</h3>
        <div className="NavBar">
          <ul>
            <li>Search</li>
            <li>
              <a style={{ color: " #1db954" }}>About</a>
            </li>
            <li>Contact Us</li>
          </ul>
        </div>
        <button className="login1">
          <a href={accessUrl}>LOGIN TO SPOTIFY</a>
        </button>
        <div>
          <SocialFollow />
        </div>
      </div>
    </div>
  );
}

export default Login;
