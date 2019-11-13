import Orbit from "./Orbit.js"
import SimpleNoise from "./SimpleNoise.js"
import Dot from "./Dot.js"
import Waves from "./Waves.js"
// Connect to the local instance of fcserver. You can change this line to connect to another computer's fcserver
const WebSocketAddress = "ws://10.71.16.78:7890"; 
//Show LED pixel locations.
const showPixelLocations = true; 

const orbit = new Orbit(WebSocketAddress, "orbits")
const simpleNoise = new SimpleNoise(WebSocketAddress, "noise")
const dot = new Dot(WebSocketAddress, "dot")
const waves = new Waves(WebSocketAddress, "waves")

let currentView = orbit
function changeView(name){
	switch(name){
		case "orbit":
			currentView = orbit		
			break;
		case "noise":
			currentView = simpleNoise;
			break;
		case "dot":
			currentView = dot
			break;
		case "waves":
			currentView = waves
			break;
	}
	currentView.setup()
}

function setup(){
	const canvas = createCanvas(128, 128);
	canvas.id(this.canvasId);
	socketSetup(WebSocketAddress);
	const spacing = height / 14.0;	
	ledGrid(0, 9, 9, width/2, height/2, spacing, spacing, HALF_PI, true);

	currentView.setup()
}

function draw(){
	currentView.draw()
}


window.setup = setup
window.draw = draw
window.showPixelLocations = showPixelLocations
window.changeView = changeView