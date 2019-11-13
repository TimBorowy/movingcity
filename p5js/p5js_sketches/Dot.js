export default class Dot{
	dot; 

	constructor(webSocketAddress, canvasId){
		this.canvasId = canvasId
		this.webSocketAddress = webSocketAddress

	}

	setup(){
    background(0);
		this.dot = loadImage("images/dot.png");
	}

	draw() {
		background(0);
		const dotSize = height * 0.7;
  	image(this.dot, mouseX - dotSize/2, mouseY - dotSize/2, dotSize, dotSize);
  	drawFrame();
	}
}