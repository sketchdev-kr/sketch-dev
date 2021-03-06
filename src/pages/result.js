import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
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
import ReactGA from 'react-ga';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';



export default function Result(props) {
  const history = useHistory();
  const [quizCount, setQuizCount] = useState("00");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [rating, setRating] = useState(0);

    useEffect(async () => {
      const quizCount = await axios.get("https://api.sketchdev.kr/sketches/count");
      setQuizCount(quizCount.data.count);

      const query = queryString.parse(props.location.search);

      const userId = query.user_id
      if (!userId) {
        history.push('/')
      }
      const getUserResponse = await axios.get(`https://api.sketchdev.kr/user/${userId}`);
      const user = getUserResponse.data;
      const userRating = user.rating
      const userScore = user.score;

      setRating(userRating);
      setScore(userScore);
      setCorrectCount(userScore / 20);
    }, [quizCount]);

    useEffect(() => {
      ReactGA.event({
        category: 'result',
        action: `Share when ${correctCount}`
      });
      window.Kakao.Link.createScrapButton({
        container: '#kakao-share' ,
        requestUrl: window.location.href,
      })
    }, []);

    return (
      <motion.div initial="exit" animate="enter" exit="exit" variants={{ exit: { transition: { staggerChildren: 0.1 }}}}>
        <main>
          <div className="result">
            <h2 className="result__title">?????? {correctCount} ??????</h2>
            <div className="result__content">
              <div className="result__content__board">
                <span className="result__content__board__span"> ?????????????????? </span>
                <span className="result__content__board__span"> ????????? ?????? <span class="result__content__board__span__rating">{rating}%?????????!</span></span>

                <Link to="/draw" className="start">
                  <input value="?????? ???????????????????" type="button" className="btn__start" />
                </Link>
                {/* <div className="start">
                  <a href="https://community.sketchdev.kr"><input value="??????????????? ????????????" type="button" className="btn__start" /></a>
                </div> */}
              </div>
              <span className="quizCount">?????? {quizCount}????????? ??????????????????! </span>
              <Link to="/quiz" className="start">
                <input value="????????????" type="button" className="btn__start" />
              </Link>
              <div className="share">
                <div className="share__method">
                  <button id="kakao-share" className="share-wrapper">
                    <img className="kakao shareicon" src={kakao} />
                  </button>
                  <button className="share-wrapper" onClick={() => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '??????????????? ????????????', 'width=600,height=800,location=no,status=no,scrollbars=yes');
                  }}>
                    <img className="facebook shareicon" src={facebook} />
                  </button>
                  <CopyToClipboard text={window.location.href}
                    onCopy={() => alert("????????? ??????????????? ??????????????????!")}
                  >
                    <button className="share-wrapper">
                      <img className="link shareicon" src={link} />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
              {/* <div className="community">
                <h4 className="community__text">????????????</h4>
                <div className="community__list">
                  <div className="community__wrapper"><a href="https://open.kakao.com/me/sketchdev"><FontAwesomeIcon icon={faCommentDots} color={"white"} size="lg" /></a></div>
                  <div className="community__wrapper"><a href="https://www.instagram.com/sketchdevkr"><FontAwesomeIcon icon={faInstagram} color={"white"} size="lg" /></a></div>
                </div>
              </div> */}
            </div>
          </div>
          <Footer />
        </main>
      </motion.div>)
}
