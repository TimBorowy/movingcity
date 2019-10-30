// Connect to the local instance of fcserver. You can change this line to connect to another computer's fcserver
var WebSocketAddress = "ws://192.168.1.25:7890"; 
//Show LED pixel locations.
var showPixelLocations = true; 
//Change the HTML Id of the canvas.
var canvasId = "grid8x8_orbits";


var dot1; 
var dot2;
var px = 0;
var py = 0;
var t = 0
function setup(){
	var canvas = createCanvas(640, 360);
	canvas.id(canvasId);
	var spacing = height / 14.0;	
	socketSetup(WebSocketAddress);	
	dot1 = loadImage("images/greenDot.png");
	dot2 = loadImage("images/purpleDot.png");
	//var spacing = (canvas.height/14);
	//Connect to the local instance of fcserver
	//Map an 9x9 grid of LEDs to the center of the window, scaled to take up most of the space
	ledGrid(0, 9, 9, width/2, height/2, spacing, spacing, HALF_PI, true);
}

function draw(){
	background(0);
	blendMode(ADD);
	// Smooth out the mouse location
	px += (mouseX - px * 0.2);
	py += (mouseY - py * 0.2);
	var a = (millis() * 0.001);
	var r = (py * 0.5);
	var dotSize = (r * 4);
	var dx = (width/2 + cos(a) * r);
	var dy = (height/2 + sin(a) * r);
	
	// Draw it centered at the mouse location
	image(dot1, dx - dotSize/2, dy - dotSize/2, dotSize, dotSize);
	
	// Another dot, mirrored around the center
	image(dot2, width - dx - dotSize/2, height - dy - dotSize/2, dotSize, dotSize);
	
	drawFrame();
	
}