
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
  
    const draw = (i) => {
      setTimeout(() => {
        if (i === canvasPaths.length) {
          return;
        }
    
        const event = canvasPaths[i];
        if (event.type === "down") {
          path = new paper.Path();
          path.strokeWidth = 5;
          path.strokeColor = 'black';
          path.strokeCap = 'round';
          path.strokeJoin = 'round';
          path.add(new paper.Point(event.x * canvasRatio, event.y * canvasRatio));
        } else if (event.type === "drag") {
          path.add(new paper.Point(event.x * canvasRatio, event.y * canvasRatio))
        }
        i+=1;
        draw(i);
      }, Math.random() * 40);
    }
    draw(0);
  };
  xmlHttp.open("get", "http://api.sketchdev.kr/sketches/60824cd82d0851b300d5e1d8");
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send();
}

(function() {
  setTimeout(onLoad, 3000);
})()