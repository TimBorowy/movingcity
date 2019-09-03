OPC opc;
PImage aquarius;

void setup()
{
  size(450, 450);
  frameRate(24);

  aquarius = loadImage("waterman3.jpg");

  // Connect to the local instance of fcserver. You can change this line to connect to another computer's fcserver
  opc = new OPC(this, "192.168.1.26", 7890);
  opc.ledGrid(0, 9, 9, width/2, height/2, 50, 50, 0, true);
}

float px, py;

void draw()
{
  background(0);
  //blendMode(ADD);
  
  // crude animation "speed"
  float a = millis() * 0.00002 % 360;
  
  //float r = py * 0.5;
  //float dx = width/2 + cos(a) * r;
  //float dy = height/2 + sin(a) * r;

  // image size
  float size = 480;
  
  // tryout for color animation
  float greenHue = millis() * 0.1 % 360;
  float redHue =  millis() * 0.1 % 360;
  
  imageMode(CENTER);
  
  // rotate and translate the actual image
  translate(450/2,450/2); 
  rotate(a); 
  //tint(260, 100, 50, 255);
  image(aquarius, 0, 0, size, size);
  // color the image
  
}
