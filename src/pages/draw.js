import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./draw.css";
import paper from "paper";
import { motion } from 'framer-motion';


let currentWidth = 5;
const canvasPaths = [];

export default function Draw(props) {
    const [ word, setWord ] = useState("");
    const [ currentColor, setColor ] = useState("#000");

    useEffect(() => {
        paper.setup("canvas");
        canvasPaths.length = 0;
        return () => {
            canvasPaths.length = 0;
        }
    }, []);

    let path;
    useEffect(() => {
        const originalWidth = 530;
        const canvasWidth = document.getElementById("canvas").clientWidth;
        const canvasRatio = originalWidth / canvasWidth;

        const tool = new paper.Tool();
        tool.minDistance = 5;
        tool.activate();
        tool.onMouseDown = (event) => {
            // Create a new path every time the mouse is clicked
            path = new paper.Path();
            path.strokeWidth = currentWidth;
            path.strokeColor = currentColor;
            console.log(currentColor);
            path.add(event.point);
            
            canvasPaths.push({ type: "down", x: event.point.x * canvasRatio, y: event.point.y * canvasRatio });
        }

        tool.onMouseDrag = (event) => {
            // Add a point to the path every time the mouse is dragged
            path.add(event.point);
            canvasPaths.push({ type: "drag", x: event.point.x * canvasRatio, y: event.point.y * canvasRatio });
        }
    }, [currentColor]);
    
    const pickColor = (color) => {
        setColor(color);
        currentWidth = color == '#F5F5F5' ? 30 : 5;
        canvasPaths.push({ type: "colorPick", color: color });
        canvasPaths.push({ type: "widthPick", width: currentWidth });
    }

    const history = useHistory();
    return (<motion.div initial="exit" animate="enter" exit="exit" variants={{
        enter: {
          opacity: 1,
          transition: { duration: 0.2, ease: "easeInOut", },
        },
        center: { opacity: 1, x: 0 },
        exit: {
          opacity: 0,
          transition: { duration: 0.2, ease: "easeInOut", },
        },
      }}>
      <div className="draw-canvas">
      <div className="title">
          <span>그림 입력</span>
      </div>
      <div className="quiz__content">
          <div className="quiz__content__image">
              <canvas id="canvas" className="quiz__content__image__canvas"></canvas>
          </div>

          <div className="containerToolbar">
          <div className="colorPreview" data-toggle="tooltip" data-placement="top" title="" style={{ backgroundColor: currentColor }} data-original-title="Color preview"></div>
          <div className="containerColorbox" data-toggle="tooltip" data-placement="top" title="" data-original-title="Select a color">
              <div className="containerColorColumn">
                  <div className="colorItem" style={{background: '#F5F5F5'}} onClick={() => pickColor('#F5F5F5')}></div>
                  <div className="colorItem" style={{background: '#C1C1C1'}} onClick={() => pickColor('#C1C1C1')}></div>
                  <div className="colorItem" style={{background: '#EF130B'}} onClick={() => pickColor('#EF130B')}></div>
                  <div className="colorItem" style={{background: '#FF7100'}} onClick={() => pickColor('#FF7100')}></div>
                  <div className="colorItem" style={{background: '#FFE400'}} onClick={() => pickColor('#FFE400')}></div>
                  <div className="colorItem" style={{background: '#00CC00'}} onClick={() => pickColor('#00CC00')}></div>
                  <div className="colorItem" style={{background: '#00B2FF'}} onClick={() => pickColor('#00B2FF')}></div>
                  <div className="colorItem" style={{background: '#231FD3'}} onClick={() => pickColor('#231FD3')}></div>
                  <div className="colorItem" style={{background: '#A300BA'}} onClick={() => pickColor('#A300BA')}></div>
                  <div className="colorItem" style={{background: '#D37CAA'}} onClick={() => pickColor('#D37CAA')}></div>
                  <div className="colorItem" style={{background: '#A0522D'}} onClick={() => pickColor('#A0522D')}></div>
              </div>
              <div className="containerColorColumn">
                  <div className="colorItem" style={{background: '#000'}} onClick={() => pickColor('#000')}></div>
                  <div className="colorItem" style={{background: '#4C4C4C'}} onClick={() => pickColor('#4C4C4C')}></div>
                  <div className="colorItem" style={{background: '#740B07'}} onClick={() => pickColor('#740B07')}></div>
                  <div className="colorItem" style={{background: '#C23800'}} onClick={() => pickColor('#C23800')}></div>
                  <div className="colorItem" style={{background: '#E8A200'}} onClick={() => pickColor('#E8A200')}></div>
                  <div className="colorItem" style={{background: '#005510'}} onClick={() => pickColor('#005510')}></div>
                  <div className="colorItem" style={{background: '#00569E'}} onClick={() => pickColor('#00569E')}></div>
                  <div className="colorItem" style={{background: '#0E0865'}} onClick={() => pickColor('#0E0865')}></div>
                  <div className="colorItem" style={{background: '#550069'}} onClick={() => pickColor('#550069')}></div>
                  <div className="colorItem" style={{background: '#A75574'}} onClick={() => pickColor('#A75574')}></div>
                  <div className="colorItem" style={{background: '#63300D'}} onClick={() => pickColor('#63300D')}></div>
              </div>
          </div>
      </div>
      </div>
      <div className="quiz__form">
          <form onSubmit={async (e) => {
              e.preventDefault();

              const result = await axios.post("https://api.sketchdev.kr/internal/sketches", {
                  word: word,
                  drawPaths: canvasPaths,
              });
              console.log(result.data);
              alert("참여 감사드립니다!");
              history.push(`/draw-share?id=${result.data.id}`)
          }}>
              <input
                  className="quiz__form__answer"
                  value={word}
                  onChange={(e) => {
                      setWord(e.target.value);
                  }}
                  type="text"
                  required
                  placeholder="답을 입력해주세요"
              />
              <button className="btn submit">제출</button>
          </form>
      </div>
  </div>
  </motion.div>)
}
