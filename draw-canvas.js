
paper.setup("canvas");
const canvasPaths = [];

const tool = new paper.Tool();
tool.minDistance = 10;
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

function save() {
  console.log(JSON.stringify(canvasPaths));
}