import React, { useEffect } from "react";
import "./check-canvas.css";
import paper from "paper";
import axios from "axios";

export default function CheckCanvas(props) {
    useEffect(async () => {
      paper.setup("canvas");

      const originalWidth = 530;
      const canvasWidth = document.getElementById("canvas").clientWidth;
      const canvasRatio = canvasWidth / originalWidth

      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      if (!id) {
        return;
      }

      const res = await axios.get(`http://api.sketchdev.kr/sketches/${id}`);
      const canvasPaths = res.data.drawPaths;

      let path;
      let currentColor = '#000';
      let currentWidth = 5;

      const draw = (i) => {
        setTimeout(() => {
          if (i === canvasPaths.length) {
            return;
          }
      
          const event = canvasPaths[i];
          if (event.type === "down") {
            path = new paper.Path();
            path.strokeWidth = currentWidth;
            path.strokeColor = currentColor;
            path.strokeCap = 'round';
            path.strokeJoin = 'round';
            path.add(new paper.Point(event.x * canvasRatio, event.y * canvasRatio));
          } else if (event.type === "drag") {
            path.add(new paper.Point(event.x * canvasRatio, event.y * canvasRatio))
          } else if (event.type === "colorPick") {
            currentColor = event.color;
            console.log(currentColor);
          } else if (event.type === "widthPick") {
            currentWidth = event.width;
          }
          i+=1;
          draw(i);
        }, Math.random() * 40);
      }
      draw(0);
    }, []);

    return (
        <main>
          <div className="quiz">
            <div className="quiz__content">
              <h2 className="title">개발자 캐치마인드</h2>
              <div className="quiz__content__image">
                <canvas id="canvas" className="quiz__content__image__canvas"></canvas>
              </div>
              <div className="share">
                <h4 className="share__text"> __ </h4>
              </div>
            </div>
          </div>
        </main>
    )
}