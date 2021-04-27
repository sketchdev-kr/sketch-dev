
paper.setup("canvas");

(function() {
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
          path.add(new paper.Point(event.x, event.y));
        } else if (event.type === "drag") {
          path.add(new paper.Point(event.x, event.y))
        }
        i+=1;
        draw(i);
      }, Math.random() * 40);
    }
    draw(0);
  };
  xmlHttp.open("get", "https://api.sketchdev.kr/sketches/60824cd82d0851b300d5e1d8");
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send();
})()