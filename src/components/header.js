import React from "react";
import "./header.css";
import logo from '../img/logo-transparent.png';

export default function Header(props) {
    return (
    <header>
        <div className="logo">
            <a href={"/"}><img className="logo_img" src={logo} alt="sketch-dev" /></a>
        </div>
    </header>)
}