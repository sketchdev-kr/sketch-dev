
const canvasPaths = [{"type":"down","x":184,"y":56.25},{"type":"drag","x":186,"y":66.25},{"type":"drag","x":189,"y":80.25},{"type":"drag","x":191,"y":90.25},{"type":"drag","x":191,"y":103.25},{"type":"drag","x":191,"y":115.25},{"type":"drag","x":191,"y":131.25},{"type":"drag","x":190,"y":144.25},{"type":"drag","x":192,"y":155.25},{"type":"drag","x":191,"y":165.25},{"type":"drag","x":193,"y":179.25},{"type":"drag","x":193,"y":196.25},{"type":"drag","x":193,"y":210.25},{"type":"drag","x":194,"y":229.25},{"type":"drag","x":194,"y":242.25},{"type":"drag","x":195,"y":253.25},{"type":"drag","x":193,"y":267.25},{"type":"down","x":146,"y":71.25},{"type":"drag","x":147,"y":82.25},{"type":"drag","x":151,"y":95.25},{"type":"drag","x":154,"y":106.25},{"type":"drag","x":156,"y":118.25},{"type":"drag","x":166,"y":123.25},{"type":"drag","x":176,"y":124.25},{"type":"drag","x":186,"y":123.25},{"type":"drag","x":199,"y":123.25},{"type":"drag","x":209,"y":123.25},{"type":"drag","x":216,"y":112.25},{"type":"drag","x":219,"y":102.25},{"type":"drag","x":222,"y":90.25},{"type":"drag","x":226,"y":79.25},{"type":"drag","x":228,"y":69.25},{"type":"down","x":344,"y":72.25},{"type":"drag","x":338,"y":62.25},{"type":"drag","x":329,"y":56.25},{"type":"drag","x":316,"y":59.25},{"type":"drag","x":307,"y":74.25},{"type":"drag","x":302,"y":87.25},{"type":"drag","x":295,"y":107.25},{"type":"drag","x":294,"y":117.25},{"type":"drag","x":290,"y":132.25},{"type":"drag","x":288,"y":142.25},{"type":"drag","x":287,"y":153.25},{"type":"drag","x":284,"y":164.25},{"type":"down","x":279,"y":109.25},{"type":"drag","x":289,"y":106.25},{"type":"drag","x":299,"y":105.25},{"type":"drag","x":309,"y":103.25},{"type":"down","x":324,"y":105.25},{"type":"drag","x":320,"y":117.25},{"type":"drag","x":317,"y":127.25},{"type":"drag","x":327,"y":134.25},{"type":"drag","x":337,"y":134.25},{"type":"drag","x":346,"y":124.25},{"type":"drag","x":347,"y":113.25},{"type":"drag","x":335,"y":108.25},{"type":"down","x":380,"y":102.25},{"type":"drag","x":382,"y":115.25},{"type":"drag","x":382,"y":126.25},{"type":"drag","x":380,"y":138.25},{"type":"drag","x":384,"y":127.25},{"type":"drag","x":390,"y":119.25},{"type":"drag","x":402,"y":117.25},{"type":"down","x":418,"y":77.25},{"type":"drag","x":423,"y":88.25},{"type":"drag","x":425,"y":102.25},{"type":"drag","x":425,"y":116.25},{"type":"drag","x":425,"y":127.25},{"type":"drag","x":422,"y":138.25},{"type":"down","x":447,"y":102.25},{"type":"drag","x":438,"y":109.25},{"type":"drag","x":429,"y":114.25},{"type":"drag","x":436,"y":122.25},{"type":"drag","x":448,"y":131.25},{"type":"down","x":357,"y":178.25},{"type":"drag","x":351,"y":192.25},{"type":"drag","x":341,"y":214.25},{"type":"drag","x":336,"y":223.25},{"type":"drag","x":336,"y":234.25},{"type":"drag","x":345,"y":240.25},{"type":"drag","x":353,"y":234.25},{"type":"down","x":387,"y":176.25},{"type":"drag","x":393,"y":184.25},{"type":"drag","x":399,"y":193.25},{"type":"drag","x":399,"y":207.25},{"type":"drag","x":394,"y":220.25},{"type":"drag","x":390,"y":231.25},{"type":"drag","x":382,"y":240.25}];


paper.setup("canvas");


function draw(i) {
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
  }, Math.random() * 60);
};
draw(0);
