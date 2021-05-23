import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import queryString from "query-string";
import Footer from "../components/footer";
import kakao from "../img/kakaolink.png";
import facebook from "../img/facebook.png"
import link from "../img/link.png";
import { motion } from "framer-motion";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "./result.css";

function randRange(start, end) {
    return Math.floor(Math.random() * (end - start +1) + start)
}

function calcRating(score) {
    if(score > 90)  return randRange(1, 20)
    if(score > 80)  return randRange(20, 30)
    if(score > 60)  return randRange(30, 60)
    if(score > 40)  return randRange(60, 80)
    return randRange(80, 100)
}

export default function Result(props) {
  const [quizCount, setQuizCount] = useState("00");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [rating, setRating] = useState(0);

    useEffect(async () => {
      const quizCount = await axios.get("https://api.sketchdev.kr/sketches/count");
      setQuizCount(quizCount.data.count);

      const query = queryString.parse(props.location.search);
      setCorrectCount(query.corrected ?? 0)
      setScore(query.score ?? 0)

      // TODO: Implement real rating
      // Workaround methodology for show rating to user
      setRating(calcRating(query.score ?? 0))
    }, [quizCount]);

    useEffect(() => {
      window.Kakao.Link.createScrapButton({
        container: '#kakao-share' ,
        requestUrl: window.location.href,
      })
    }, []);

    return (
      <motion.div initial="exit" animate="enter" exit="exit" variants={{ exit: { transition: { staggerChildren: 0.1 }}}}>
        <main>
          <div className="result">
            <h2 className="result__title">결과 {correctCount} 문제</h2>
            <div className="result__content">
              <div className="result__content__board">
                <span className="result__content__board__span"> 대단하시군요 </span>
                <span className="result__content__board__span"> 당신은 상위 {rating}%입니다! </span>

                <Link to="/draw" className="start">
                  <input value="그림 그려보실래요?" type="button" className="btn__start" />
                </Link>
                {/* <div className="start">
                  <a href="https://community.sketchdev.kr"><input value="스케치데브 커뮤니티" type="button" className="btn__start" /></a>
                </div> */}
              </div>
              <span className="quizCount">다른 {quizCount}문제에 도전해보세요! </span>
              <Link to="/quiz" className="start">
                <input value="다시하기" type="button" className="btn__start" />
              </Link>
              <div className="share">
                <h4 className="share__text">공유하기</h4>
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
            </div>
          </div>
          <Footer />
        </main>
      </motion.div>)
}
