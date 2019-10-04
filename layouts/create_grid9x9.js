/*
 * Model creation script for a single left-to-right 8x8 grid,
 * like the ones sold by AdaFruit.
 *
 * 2014 Micah Elizabeth Scott
 * 2019 Redo by Tim Borowy
 * This file is released into the public domain.
 */
const fs = require("fs");

const scale = -1 / 4.0;
const centerX = 8 / 2.0;
const centerY = 8 / 2.0;

function generateModel() {
  let model = [];

  // Instance of a zig-zag 8x8 grid with upper-left corner at (x, y)
  for (var v = 0; v < 9; v++) {
    if (v % 2 == 0) {
      for (let u = 0; u < 9; u++) {
        model.push({
          point: [(u - centerX) * scale, 0, (v - centerY) * scale]
        });
      }
    } else {
      for (let u = 9; u > 0; u--) {
        model.push({
          point: [(u - centerX) * scale, 0, (v - centerY) * scale]
        });
      }
    }
  }

  return model;
}

console.log(JSON.stringify(generateModel()));
// Write json to file
fs.writeFileSync("grid9x9v2.json", JSON.stringify(generateModel()))
