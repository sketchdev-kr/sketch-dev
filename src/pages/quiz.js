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
import ReactGA from 'react-ga';

const TOTAL_QUIZ = 5;
const SCORE_PER_QUIZ = 20;
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

  const [showThumbup, setShowThumbup] = useState(false);
  const [showThumbdown, setShowThumbdown] = useState(false);

  // on initial mount
  useEffect(async () => {
    setMounted(true);
    const quizesRes = await axios.get("https://api.sketchdev.kr/sketches/random");
    setQuizes(quizesRes.data.ids);
    setQuizNumber(quizNumber + 1);
    // ReactGA.event({
    //   category: 'Quiz',
    //   action: 'Started'
    // });
    setShowThumbup(false);
    setShowThumbdown(false);

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
        setText("???????????????.\n ?????????: " + answer);
        ReactGA.event({
          category: 'Quiz',
          action: `Fail ${answer}`
        });
        setTimeout(async () => {
          if (quizNumber === TOTAL_QUIZ) {
            const createUserResponse = await axios.post("https://api.sketchdev.kr/user", {
              score: (answerCount + 1) * SCORE_PER_QUIZ,
            });
            const user = createUserResponse.data;
            const userId = user.userId;
            history.push(`/result?user_id=${userId}`);
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
    ReactGA.event({
      category: 'Quiz',
      action: `Started ${quizNumber}`
    });

    setTimeout(async () => {
      paper.remove();
      paper.setup("canvas");
      setQuizLodingShow(false);
      if (seconds === 0) {
        return;
      }
      setShowThumbup(true);
      setShowThumbdown(true);


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
          <span className="title__score">????????????: <span>{answerCount} / {TOTAL_QUIZ}</span>  </span>
          </div>

        </div>
        <div className="quiz__content">

          <div className="quiz__content__image">
            <div className={['quiz__content__loading', quizLoadingShow ? "quiz__content__loading__onshow" : ""].join(' ')}></div>
            <span className={['quiz__content__text', textShow ? "quiz__content__text__onshow" : ""].join(' ')}>{text}</span>
            <canvas id="canvas" className="quiz__content__image__canvas"></canvas>
          </div>
          <div className="quiz__form">
            <div className="thumbs">
              { showThumbup ? <FontAwesomeIcon onClick={async () => {
                setShowThumbdown(false);
                if (showThumbup && showThumbdown) {
                  // first try to push the button
                  await axios.post(`https://api.sketchdev.kr/sketches/${quizes[quizNumber-1]}/like`, {
                    status: true,
                  });
                }
              }} id="thumbsUp" icon={faThumbsUp} /> : null } 
              { showThumbdown ? <FontAwesomeIcon onClick={async () => {
                setShowThumbup(false);
                // first try to push the button
                await axios.post(`https://api.sketchdev.kr/sketches/${quizes[quizNumber-1]}/unlike`, {
                  status: true,
                });
              }} id="thumbsDown" icon={faThumbsDown}/> : null }
            </div>
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
              setText(answer + ", ???????????????!");
              ReactGA.event({
                category: 'Quiz',
                action: `Success ${answer}`
              });
              setTimeout(async () => {
                if (quizNumber === TOTAL_QUIZ) {
                  const corrected = (answerCount + 1)
                  const score = corrected * SCORE_PER_QUIZ;
                  const createUserResponse = await axios.post("https://api.sketchdev.kr/user", {
                    score,
                  });
                  const user = createUserResponse.data;
                  const userId = user.userId;
                  history.push(`/result?user_id=${userId}`);
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
                placeholder="?????? ??????????????????"
              />
              <button className="btn submit">??????</button>
            </form>
            <button className="btn pass" onClick={(e) => {
              setSeconds(0);
            }}>??????</button>
          </div>
        </div>
      </div>
    </main>
  </motion.div>)
}
