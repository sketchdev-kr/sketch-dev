import React from 'react';
import "./nav.css";

export default function Navigation() {
  return (<nav>
    <ul>
      <li>
        <a href="/">홈</a>
      </li>
      <li>
        <a href="/result?user_id=60aa1d088502c666a425fc4c">명예의 전당</a>
      </li>
      <li>
        <a href="/draw-share?id=60aa635455af666b8dc03267">새로 올라온 그림</a>
      </li>
      <li>
        <a href="https://community.sketchdev.kr">커뮤니티</a>
      </li>
    </ul>
  </nav>
  )
}