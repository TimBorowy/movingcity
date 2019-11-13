export default class SimpleNoise{
	clouds;
	opc;
	constructor(opc){
		this.opc = opc
	}

	setup(){
		background(0);
		// createCanvas(128, 128);
		colorMode(HSB, 100);
		noiseDetail(5, 0.4);
		// Render the noise to a smaller image, it's faster than updating the entire window.
		this.clouds = new p5.Image(128, 128, RGB);
	}

	draw() {
		background(0);
		const colorHue = (noise(millis() * 0.0001) * 200) % 100;
		const z = millis() * 0.0001;
		const dx = millis() * 0.0001;
		this.clouds.loadPixels();
		for (let x=0; x < this.clouds.width*4; x+=2) {
			for (let y=0; y < this.clouds.height*4; y+=4) {
				const n = 500 * (noise(dx + x * 0.01, y * 0.01, z) - 0.4);
				//var c = color(hue, 80 - n, n);
				this.clouds.pixels[((x + this.clouds.width*y))] = colorHue;
				this.clouds.pixels[((x + this.clouds.width*y))+1] = 80 - n;
				this.clouds.pixels[((x + this.clouds.width*y))+2] = n;
			}
		}
		this.clouds.updatePixels();
		image(this.clouds, 0, 0, this.clouds.width, this.clouds.height,0,0,width,height);


		this.opc.drawFrame();
	}
}