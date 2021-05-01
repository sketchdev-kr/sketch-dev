import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./footer.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faInfoCircle);

export default function Footer() {
  return (<footer>
    <div className="license">
      <div className="info">
        <span className="info__icon">Link Icon License</span>
        <div className="info__data">
          Icons made by
          <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </div>
      <FontAwesomeIcon id="info-icon" icon={["fas", "info-circle"]} onClick={() => {
          const info = document.querySelector(".info");
          info.classList.toggle("show");
      }} />
    </div>
  </footer>)
}
