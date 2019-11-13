OPC opc;
DisposeHandler dh;
PImage shapeTexture;


void setup(){
  
  size(500,500);
  noFill();
  stroke(255);
  strokeWeight(2);
  //fill(50, 255, 0);
  
  shapeTexture = loadImage("data/dot.png");
  
  
   
  opc = new OPC(this, "10.71.16.78", 7890);
  opc.ledGrid(0, 9, 9, width/2, height/2, 50, 50, 0, true);
  dh  = new DisposeHandler(this);
   
}

float t = 0;

void draw(){
  background(0);
  noStroke();
  
  translate(width / 2, height /2);
  
  beginShape();
  
  texture(shapeTexture);
  
  vertex(10, 20, 0, 0);
vertex(80, 5, 100, 0);
vertex(95, 90, 100, 100);
vertex(40, 95, 0, 100);
  
  for(float theta = 0; theta <= PI * 2; theta += 0.01){
    float rad = r(theta,
    sin(t) * 0.5 + 1.5, // a
    cos(t) * 0.5 + 1.5, // b
    8, // m
    mouseX / 100.0, // n1
    2 , // n2
    1  // n3
    );
    float x = rad * cos(theta) * 50;
    float y = rad * sin(theta) * 50;
    vertex(x,y);
    
  }
  
  endShape();
  
  t += 0.05;
}

float r(float theta, float a, float b, float m, float n1, float n2, float n3 ){
  return pow(pow(abs(cos(m * theta / 4.0) / a), n2) 
  + pow(abs(sin(m * theta / 4.0) / b), n3), -1 / n1);
}

public class DisposeHandler { // LEDs off when exiting
  DisposeHandler(PApplet pa) {
    pa.registerMethod("dispose", this);
  }
  public void dispose() {
    for(int i=0; i < 9*9; i++) opc.setPixel(i, 0);
    opc.writePixels();
  }
}
