#!/usr/bin/env node

// Particle system example with Node and opc.js, controllable via OSC.
// You can use this with TouchOSC, with the "Simple" touch layout.
// Note that we don't push values *to* TouchOSC yet, so the initial state
// of the controls may not match the state we keep here on the OSC server.
//
// Specify an LED layout file on the command line, or use the default (grid32x16z)

var osc = require('node-osc');
var oscServer = new osc.Server(8000, '0.0.0.0');

var OPC = new require('./opc');
var model = OPC.loadModel(process.argv[2] || '../layouts/grid9x9.json');
var client = new OPC('192.168.1.25', 7890);


// State values; change over time
var stateAngle1 = 0;
var stateAngle2 = 0;

// Parameters, set via OSC
var hue = 0.3;
var hueShift = 0.8;
var saturation = 0.5;
var brightness = 0.5;
var falloff = 0.5;
var touchx = 0.1;
var touchy = 0.2;
let color = [155, 100, 55];

oscServer.on('message', function (msg, rinfo) {

    // Show the message, for debugging
    console.log(msg);

    // First page, color
    if (msg[0] == '/1/fader1') hue = msg[1];
    if (msg[0] == '/1/fader2') hueShift = msg[1];
    if (msg[0] == '/1/fader3') saturation = msg[1];
    if (msg[0] == '/1/fader4') falloff = msg[1];
    if (msg[0] == '/1/fader5') brightness = msg[1];
    if (msg[0] == '/2/push1') color = [155, 100, 55];
    if (msg[0] == '/2/push2') color = [100, 155, 55];
    if (msg[0] == '/2/push3') color = [100, 55, 155];
    if (msg[0] == '/2/push4') color = [55, 155, 100];

    // XY pad, oscillator rates
    if (msg[0] == '/3/xy') {
        touchx = msg[1];
        touchy = msg[2];
    }
});

function draw() {

    var numParticles = 200;
    var particles = [];

    var trail = 20.0;
    var scaledRate1 = (touchx - 0.5) * 0.5;
    var scaledRate2 = (touchy - 0.5) * 0.5;
    stateAngle1 += scaledRate1;
    stateAngle2 += scaledRate2;

    // for (var i = 0; i < numParticles; i++) {
    //     var s = i / numParticles;

    //     // Local state angles for this particle
    //     var lsa1 = stateAngle1 + scaledRate1 * trail * s;
    //     var lsa2 = stateAngle2 + scaledRate2 * trail * s;

    //     // Compute position, this gives us the shape of our effect.
    //     var radius = 0.1 + 2.0 * s;
    //     var x = radius * Math.cos(lsa1);
    //     var y = radius * Math.sin(lsa2);

    //     particles[i] = {
    //         point: [x, 0, y],
    //         intensity: brightness * (1 - s),
    //         falloff: falloff * 175,
    //         color: OPC.hsv( hue + s * 2.0 * (hueShift - 0.5), saturation, 0.5)
    //     };
    // }

    // var s = 1 / numParticles;
    

    // particles = [
    //     {
    //         point: model[Math.floor(model.length / 2)],
    //         intensity: brightness * (1 - s),
    //         falloff: falloff * 175,
    //         //color: [255, 0,0]
    //         color: OPC.hsv( hue + s * 2.0 * (hueShift - 0.5), saturation, 0.5)
    //     }
    // ]

    //client.mapParticles(particles, model);

    client.mapPixels((pixel) => {
        return color

    }, model)
}

setInterval(draw, 10);
