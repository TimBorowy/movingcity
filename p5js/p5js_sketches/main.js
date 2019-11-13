import OPC from "../libraries/OpenPixelControl.js"
import Orbit from "./Orbit.js"
import SimpleNoise from "./SimpleNoise.js"
import Dot from "./Dot.js"
import Waves from "./Waves.js"


const opc = new OPC("ws://10.71.16.78:7890")

//Show LED pixel locations.
const showPixelLocations = true; 

const orbit = new Orbit(opc)
const simpleNoise = new SimpleNoise(opc)
const dot = new Dot(opc)
const waves = new Waves(opc)

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
	canvas.id("currentCanvas");
	
	const spacing = height / 14.0;	
	opc.ledGrid(0, 9, 9, width/2, height/2, spacing, spacing, HALF_PI, true);

	currentView.setup()
}

function draw(){
	currentView.draw()
}


window.setup = setup
window.draw = draw
window.showPixelLocations = showPixelLocations
window.changeView = changeView