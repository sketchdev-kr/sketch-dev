import React, { useEffect, useState, useRef } from "react";
import queryString from 'query-string';
import paper from "paper";
import axios from "axios";
import kakao from "../img/kakaolink.png";
import facebook from "../img/facebook.png"
import link from "../img/link.png";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from "react-router-dom";
import "./draw-share.css";


export default function DrawShare(props) {
  const [hint, setHint] = useState("");
  const stopDraw = useRef(false);

  useEffect(async () => {
    stopDraw.current = false;
    window.Kakao.Link.createScrapButton({
      container: '#kakao-share' ,
      requestUrl: window.location.href,
    });

    paper.setup("canvas");

    const originalWidth = 530;
    const canvasWidth = document.getElementById("canvas").clientWidth;
    const canvasRatio = canvasWidth / originalWidth;

    
    const query = queryString.parse(props.location.search);
    const id = query.id;
    if (!id) {
      return;
    }

    const res = await axios.get(`https://api.sketchdev.kr/sketches/${id}`);
    const canvasPaths = res.data.drawPaths;
    setHint(Array(res.data.word.length).fill('_').join(' '));

    let path;
    let currentColor = '#000';
    let currentWidth = 5;

    const draw = (i) => {
      setTimeout(() => {
        if (i === canvasPaths.length || stopDraw.current) {
          return;
        }
        console.log(stopDraw.current);
    
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
          <div className="title">
            <div></div>
            <div className="title__box">
              <span>{hint}</span>
            </div>
            <div></div>
          </div>
          <div className="quiz__content">
            <div className="quiz__content__image">
              <canvas id="canvas" className="quiz__content__image__canvas"></canvas>
            </div>
            <div className="share">
              <h4 className="share__text">그림 공유하기</h4>
              <div className="share__method">
                <button id="kakao-share" className="share-wrapper">
                  <img className="kakao shareicon" src={kakao} />
                </button>
                <button className="share-wrapper" onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '페이스북에 공유하기', 'width=600,height=800,location=no,status=no,scrollbars=yes');
                }}>
                  <img className="facebook shareicon" src={facebook} />
                </button>
                <CopyToClipboard text={window.location.href}
                  onCopy={() => alert("링크가 클립보드에 복사되었어요!")}
                >
                  <button className="share-wrapper">
                    <img className="link shareicon" src={link} />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <Link to="/draw" className="drawShare" onClick={() => {stopDraw.current = true;}}>
              <input value="그림 그려보실래요?" type="button" className="btn__start" />
            </Link>
            <Link to="/" className="drawShare" onClick={() => {stopDraw.current = true;}}>
              <input value="홈으로" type="button" className="btn__start" />
            </Link>
          </div>
        </div>
      </main>
  )
}