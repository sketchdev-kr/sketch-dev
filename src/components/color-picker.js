import React, { Component } from "react";
import "./color-picker.css";

export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#000'
        }
    }
    
    pickColor(color) {
        this.setState({ color: color });
    }

    render() {
        return (<div className="containerToolbar">
        <div className="colorPreview" data-toggle="tooltip" data-placement="top" title="" style={{ backgroundColor: this.state.color }} data-original-title="Color preview"></div>
        <div className="containerColorbox" data-toggle="tooltip" data-placement="top" title="" data-original-title="Select a color">
           <div className="containerColorColumn">
              <div className="colorItem" style={{background: '#FFF'}} onClick={() => this.pickColor('#FFF')}></div>
              <div className="colorItem" style={{background: '#C1C1C1'}} onClick={() => this.pickColor('#C1C1C1')}></div>
              <div className="colorItem" style={{background: '#EF130B'}} onClick={() => this.pickColor('#EF130B')}></div>
              <div className="colorItem" style={{background: '#FF7100'}} onClick={() => this.pickColor('#FF7100')}></div>
              <div className="colorItem" style={{background: '#FFE400'}} onClick={() => this.pickColor('#FFE400')}></div>
              <div className="colorItem" style={{background: '#00CC00'}} onClick={() => this.pickColor('#00CC00')}></div>
              <div className="colorItem" style={{background: '#00B2FF'}} onClick={() => this.pickColor('#00B2FF')}></div>
              <div className="colorItem" style={{background: '#231FD3'}} onClick={() => this.pickColor('#231FD3')}></div>
              <div className="colorItem" style={{background: '#A300BA'}} onClick={() => this.pickColor('#A300BA')}></div>
              <div className="colorItem" style={{background: '#D37CAA'}} onClick={() => this.pickColor('#D37CAA')}></div>
              <div className="colorItem" style={{background: '#A0522D'}} onClick={() => this.pickColor('#A0522D')}></div>
           </div>
           <div className="containerColorColumn">
              <div className="colorItem" style={{background: '#000'}} onClick={() => this.pickColor('#000')}></div>
              <div className="colorItem" style={{background: '#4C4C4C'}} onClick={() => this.pickColor('#4C4C4C')}></div>
              <div className="colorItem" style={{background: '#740B07'}} onClick={() => this.pickColor('#740B07')}></div>
              <div className="colorItem" style={{background: '#C23800'}} onClick={() => this.pickColor('#C23800')}></div>
              <div className="colorItem" style={{background: '#E8A200'}} onClick={() => this.pickColor('#E8A200')}></div>
              <div className="colorItem" style={{background: '#005510'}} onClick={() => this.pickColor('#005510')}></div>
              <div className="colorItem" style={{background: '#00569E'}} onClick={() => this.pickColor('#00569E')}></div>
              <div className="colorItem" style={{background: '#0E0865'}} onClick={() => this.pickColor('#0E0865')}></div>
              <div className="colorItem" style={{background: '#550069'}} onClick={() => this.pickColor('#550069')}></div>
              <div className="colorItem" style={{background: '#A75574'}} onClick={() => this.pickColor('#A75574')}></div>
              <div className="colorItem" style={{background: '#63300D'}} onClick={() => this.pickColor('#63300D')}></div>
           </div>
        </div>
     </div>)
    }
}
