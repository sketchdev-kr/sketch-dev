import React, { Component } from "react";
import "./header.css";
import logo from '../img/logo-transparent.png';

export default function Header(props) {
    return (
    <header>
        <div className="logo">
            <img className="logo_img" src={logo} alt="sketch-dev" />
        </div>
    </header>)
}