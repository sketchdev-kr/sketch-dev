import React, { useEffect, useState } from 'react';
import "./quiz.css";
import clockImage from "../img/clock.png";
import axios from 'axios';
import paper from 'paper';
import { motion } from 'framer-motion';

export default function Quiz(props) {
  const [quizNumber, setQuizNumber] = useState(1);
  const [seconds, setSeconds] = useState(27);
  let mounted = false;
  if (seconds > 0) {
    setTimeout(() => {
      const secs = seconds - 1;
      setSeconds(secs);
    }, 1000);
  }

  useEffect(async () => {
    mounted = true;
    const quizesRes = await axios.get("http://api.sketchdev.kr/sketches/random");
    const quizes = quizesRes.data.ids;
    setTimeout(async () => {
      if (!mounted) {
        return;
      }
      paper.setup("canvas");

      const originalWidth = 530;
      const canvasWidth = document.getElementById("canvas").clientWidth;
      const canvasRatio = canvasWidth / originalWidth
  
      const res = await axios.get(`http://api.sketchdev.kr/sketches/${quizes[quizNumber-1]}`);
      const canvasPaths = res.data.drawPaths;
    
      let path;
      let currentColor = '#000';
      let currentWidth = 5;
  
      const draw = (i) => {
        if (!mounted) {
          return;
        }
        setTimeout(() => {
          if (!mounted || i === canvasPaths.length) {
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

      return () => {
        paper.view.remove();
        mounted = false;
      }
    }, 3000);
  }, []);

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
    <main>
      <div className="quiz">
        <div className="title">
          <div className="title__timer">
            <img className="title__timer__img"src={clockImage} />
            <span className="title__timer__left">{seconds}s</span>
          </div>
          <span className="title__score">맞춘문제: 0 / 10 </span>
        </div>
        <div className="quiz__content">
          
          <div className="quiz__content__image">
            <div className="quiz__content__loading"></div>
            <span className="quiz__content__number">Quiz.{quizNumber}</span>
            <div className="thumbs">
              <i id="thumbsUp" className="far fa-thumbs-up"></i>
              <i id="thumbsDown" className="far fa-thumbs-down"></i>
            </div>
            <canvas id="canvas" className="quiz__content__image__canvas"></canvas>
          </div>
          <div className="quiz__form">
            <form>
              <input
                className="quiz__form__answer"
                type="text"
                required
                placeholder="답을 입력해주세요"
              />
              <button className="btn submit">제출</button>
            </form>
            <button className="btn pass">패스</button>
          </div>
        </div>
      </div>
    </main>
  </motion.div>)
}
