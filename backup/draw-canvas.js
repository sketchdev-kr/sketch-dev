paper.setup("canvas");
paper.fillColor = '#FFF'
const canvasPaths = [];

let currentColor = '#000';
let currentWidth = 5;

const tool = new paper.Tool();
tool.minDistance = 5;
tool.activate();
tool.onMouseDown = (event) => {
  // Create a new path every time the mouse is clicked
  path = new paper.Path();
  path.strokeWidth = currentWidth;
  path.strokeColor = currentColor;
  path.add(event.point);
  
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
    if (xmlHttp.readyState !== XMLHttpRequest.DONE) return;

    console.log(xmlHttp.responseText);
    alert("성공! " + xmlHttp.responseText);
  };
  xmlHttp.open("post", "https://api.sketchdev.kr/internal/sketches");
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(JSON.stringify({
    word: word.value,
    drawPaths: canvasPaths,
  }));
});


function pickColor(color) {
  document.querySelector(".colorPreview").style.backgroundColor = color
  currentColor = color;
  currentWidth = color == '#FFF' ? 30 : 5;
  canvasPaths.push({ type: "colorPick", color: currentColor });
  canvasPaths.push({ type: "widthPick", width: currentWidth });
}

function save() {
  console.log(JSON.stringify(canvasPaths));
}