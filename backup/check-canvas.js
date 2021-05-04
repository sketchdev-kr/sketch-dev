
paper.setup("canvas");

const originalWidth = 530;
const canvasWidth = document.getElementById("canvas").clientWidth;
const canvasRatio = canvasWidth / originalWidth
console.log(canvasWidth, canvasRatio)


function onLoad() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState !== XMLHttpRequest.DONE) return;

    const res = JSON.parse(xmlHttp.responseText);
    const canvasPaths = res.drawPaths;
  
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
  };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) {
    return;
  }
  xmlHttp.open("get", `https://api.sketchdev.kr/sketches/${id}`);
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send();
}

(function() {
  onLoad();
})()