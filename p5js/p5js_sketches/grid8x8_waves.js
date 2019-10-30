// Connect to the local instance of fcserver. You can change this line to connect to another computer's fcserver
var WebSocketAddress = "ws://192.168.1.25:7890"; 
//Show LED pixel locations.
var showPixelLocations = true; 
let t = 0; // time variable
function setup(){
	var spacing = height / 14.0;	
	socketSetup(WebSocketAddress);	
	
	createCanvas(600, 600);
  	noStroke();
  	fill(40, 200, 40);

	ledGrid(0, 9, 9, width/2, height/2, spacing, spacing, HALF_PI, true);
}

function draw() {
	background(10, 10); // translucent background (creates trails)
  
	// make a x and y grid of ellipses
	for (let x = 0; x <= width; x = x + 30) {
	  for (let y = 0; y <= height; y = y + 30) {
		// starting point of each circle depends on mouse position
		const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
		const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
		// and also varies based on the particle's location
		const angle = xAngle * (x / width) + yAngle * (y / height);
  
		// each particle moves in a circle
		const myX = x + 20 * cos(2 * PI * t + angle);
		const myY = y + 20 * sin(2 * PI * t + angle);
  
		ellipse(myX, myY, 10); // draw particle
	  }
	}
  
	t = t + 0.01; // update time
  }