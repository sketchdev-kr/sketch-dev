import React, { useEffect, useState, useRef, } from 'react';
import { useHistory } from 'react-router-dom';
import "./quiz.css";
import clockImage from "../img/clock.png";
import axios from 'axios';
import paper from 'paper';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as bfaTumbsUp, faThumbsDown as bfaTumbsDown} from "@fortawesome/free-regular-svg-icons";

const TOTAL_QUIZ = 10;
const TIMER = 27;

export default function Quiz(props) {
  const [quizLoadingShow, setQuizLodingShow] = useState(true);
  const [textShow, setTextShow] = useState(true);
  const [quizes, setQuizes] = useState([]);
  const [quizNumber, setQuizNumber] = useState(0);
  const [seconds, setSeconds] = useState(TIMER);
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [mounted, setMounted] = useState(false);
  const [answerCount, setAnswerCount] = useState(0);
  // const [stopDraw, setStopDraw] = useState(false);
  const [hint, setHint] = useState("");

  const stopDraw = useRef(false);

  // on initial mount
  useEffect(async () => {
    setMounted(true);
    const quizesRes = await axios.get("https://api.sketchdev.kr/sketches/random");
    setQuizes(quizesRes.data.ids);
    setQuizNumber(quizNumber + 1);

    return () => {
      stopDraw.current = true;
      setMounted(false);
    }
  }, []);



  // timer
  useEffect(() => {
    const countDown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds-1);
      }
      if (seconds === 10 && answer.length > 2) {
        const idx = Math.floor(Math.random() * answer.length);

        setHint(`${hint.substring(0, 2*idx)}${answer[idx]}${hint.substring(2*idx+1)}`)
      }

      if (seconds === 0) {
        clearInterval(countDown);
        stopDraw.current = true;
        setQuizLodingShow(true);
        setHint(answer);
        setText("아쉽습니다.\n 정답은: " + answer);
        setTimeout(async () => {
          if (quizNumber === TOTAL_QUIZ) {
            await axios.post("https://api.sketchdev.kr/user", {
              score: (answerCount + 1) * 10,
            });
            history.push('/result');
            return;
          }
          setHint("");
          setSeconds(TIMER);
          stopDraw.current = false;
          setQuizNumber(quizNumber+1);
        }, 3250);
      }
    }, 1000);
    return () => clearInterval(countDown);
  }, [seconds]);


  // on quiz number updated
  useEffect(async () => {
    if (quizNumber === 0) { return; }
    setText("Quiz. " + quizNumber);
    setTimeout(async () => {
      paper.remove();
      paper.setup("canvas");
      setQuizLodingShow(false);
      if (seconds === 0) {
        return;
      }


      const originalWidth = 530;
      const canvasWidth = document.getElementById("canvas").clientWidth;
      const canvasRatio = canvasWidth / originalWidth
  
      const res = await axios.get(`https://api.sketchdev.kr/sketches/${quizes[quizNumber-1]}`);
      setAnswer(res.data.word);
      setHint(Array(res.data.word.length).fill('_').join(' '));
      const canvasPaths = res.data.drawPaths;
    
      let path;
      let currentColor = '#000';
      let currentWidth = 5;
      const draw = (i) => {
        setTimeout(() => {
          if (i === canvasPaths.length || stopDraw.current) {
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
      }
    }, 3000);
  }, [quizNumber]);

  // function that handles thumbs btn
  const handleClick = (event) =>{
    event.target.icon = {bfaTumbsUp};
  }


  // on quiz text updated
  useEffect(async() => {
    setTextShow(true);
    setTimeout(() => {
      setTextShow(false);
    }, 2750);
  }, [text]);

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
    <main>
      <div className="quiz">
        <div className="title">
          <div className="title__box timer">
          <div className="title__timer">
            <img className="title__timer__img"src={clockImage} />
            <span className="title__timer__left">{seconds}s</span>
          </div>
          </div>
          
          <div className="title__box">
            <span>{hint}</span>
          </div>
          
          <div className="title__box score">
          <span className="title__score">맞춘문제: <span>{answerCount}/ {TOTAL_QUIZ}</span>  </span>
          </div>
          
        </div>
        <div className="quiz__content">
          
          <div className="quiz__content__image">
            <div className={['quiz__content__loading', quizLoadingShow ? "quiz__content__loading__onshow" : ""].join(' ')}></div>
            <span className={['quiz__content__text', textShow ? "quiz__content__text__onshow" : ""].join(' ')}>{text}</span>
            <div className="thumbs">
              <FontAwesomeIcon Onclick={handleClick} id="thumbsUp" icon={faThumbsUp} />
              <FontAwesomeIcon id="thumbsDown" icon={faThumbsDown}/>
            </div>
            <canvas id="canvas" className="quiz__content__image__canvas"></canvas>
          </div>
          <div className="quiz__form">
            <form onSubmit={async (e) => {
              e.preventDefault();
              const userAnswer = e.target[0].value;
              e.target[0].value = "";
              if (userAnswer.toLowerCase() !== answer.toLowerCase()) {
                e.target[0].className = "quiz__form__answer quiz__form__answer__incorrect";
                return;
              }
              
              setHint(userAnswer);
              e.target[0].className = "quiz__form__answer";
              stopDraw.current = true;
              setSeconds(-1);
              setAnswerCount(answerCount + 1);

              stopDraw.current = true;
              setQuizLodingShow(true);
              setText(answer + ", 정답입니다!");
              setTimeout(async () => {
                if (quizNumber === TOTAL_QUIZ) {
                  await axios.post("https://api.sketchdev.kr/user", {
                    score: (answerCount + 1) * 10,
                  });
                  history.push('/result');
                  return;
                }
                setHint("");
                setSeconds(TIMER);
                stopDraw.current = false;
                setQuizNumber(quizNumber+1);
              }, 3250);
            }}>
              <input
                className="quiz__form__answer"
                type="text"
                required
                placeholder="답을 입력해주세요"
              />
              <button className="btn submit">제출</button>
            </form>
            <button className="btn pass" onClick={(e) => {
              setSeconds(0);
            }}>패스</button>
          </div>
        </div>
      </div>
    </main>
  </motion.div>)
}
