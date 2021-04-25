paper.setup("canvas");
const canvasPaths = [];

const tool = new paper.Tool();
tool.minDistance = 5;
tool.activate();
tool.onMouseDown = (event) => {
  // Create a new path every time the mouse is clicked
  path = new paper.Path();
  path.add(event.point);
  path.strokeWidth = 5;
  path.strokeColor = 'black';
  
  canvasPaths.push({ type: "down", x: event.point.x, y: event.point.y });
}

let path;
tool.onMouseDrag = (event) => {
  // Add a point to the path every time the mouse is dragged
  path.add(event.point);
  canvasPaths.push({ type: "drag", x: event.point.x, y: event.point.y });
}

const word = document.querySelector(".quiz__form__answer");
const form = document.querySelector(".quiz__form");
form.addEventListener('submit', (e) => {
  e.preventDefault();

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    console.log(xmlHttp.responseText);
  };
  xmlHttp.open("post", "http://sketch-dev-backend-dev.ap-northeast-2.elasticbeanstalk.com/internal/sketches");
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(JSON.stringify({
    word: word.value,
    drawPaths: canvasPaths,
  }));
});