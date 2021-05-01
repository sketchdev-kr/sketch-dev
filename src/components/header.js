import React, { Component } from "react";
import "./header.css";
import logo from '../img/logo-transparent.png';

export default class Header extends Component {

    render() {
        return (<header><div className="logo">
            <img className="logo_img" src={logo} alt="sketch-dev" />
        </div></header>)
    }
}
