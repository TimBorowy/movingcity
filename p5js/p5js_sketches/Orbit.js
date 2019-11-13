export default class Orbit{
	dot1; 
	dot2;
	px = 0;
	py = 0;
	//t = 0
	constructor(webSocketAddress, canvasId){
		this.canvasId = canvasId
		this.webSocketAddress = webSocketAddress

	}

	setup(){
    background(0);
		this.dot1 = loadImage("images/greenDot.png");
		this.dot2 = loadImage("images/purpleDot.png");
	}

	draw() {
		background(0);
		blendMode(ADD);
		// Smooth out the mouse location
		this.px += (mouseX - this.px * 0.2);
		this.py += (mouseY - this.py * 0.2);
		const a = (millis() * 0.001);
		const r = (this.py * 0.5);
		const dotSize = (r * 4);
		const dx = (width/2 + cos(a) * r);
		const dy = (height/2 + sin(a) * r);
		
		// Draw it centered at the mouse location
		image(this.dot1, dx - dotSize/2, dy - dotSize/2, dotSize, dotSize);
		
		// Another dot, mirrored around the center
		image(this.dot2, width - dx - dotSize/2, height - dy - dotSize/2, dotSize, dotSize);
		
		drawFrame();
	}
}