import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "./SocialFollow.css";

function SocialFollow() {
  return (
    <div className="social">
      <h2>Follow Us</h2>
      <ul>
        <li>
          <a href="https://www.facebook.com/" className="Facebook">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/" className="whatsapp">
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/" className="Insta">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SocialFollow;
