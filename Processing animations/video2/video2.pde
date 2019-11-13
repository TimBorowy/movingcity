OPC opc;
PImage aquarius;


import processing.video.*;
Movie myMovie;



void setup()
{
  size(700, 450);
  frameRate(24);

  //myMovie = new Movie(this, "feel_the_love.mp4");
  myMovie = new Movie(this, "ganbreeder.mp4");
  myMovie.play();

  // Connect to the local instance of fcserver. You can change this line to connect to another computer's fcserver
  opc = new OPC(this, "10.71.16.78", 7890);
  opc.ledGrid(0, 9, 9, width/2, height/2, 50, 50, 0, true);
}

float px, py;

void draw()
{
  background(0);
  imageMode(CENTER);
  image(myMovie, 700/2, 450/2);
  
}

void movieEvent(Movie m) {
  m.read();
}
