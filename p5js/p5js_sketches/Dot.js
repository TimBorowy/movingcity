export default class Dot{
	dot; 

	opc;
	constructor(opc){
		this.opc = opc
	}

	setup(){
    background(0);
		this.dot = loadImage("images/dot.png");
	}

	draw() {
		background(0);
		const dotSize = height * 0.7;
  	image(this.dot, mouseX - dotSize/2, mouseY - dotSize/2, dotSize, dotSize);
  	this.opc.drawFrame();
	}
}