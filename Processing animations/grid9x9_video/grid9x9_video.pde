// Processing 2.X movie example for
// Adafruit NeoPixel/Fadecandy LED curtain
 
import processing.video.*;
 
OPC            opc;
Movie          movie;
PGraphics      g; // Offscreen buffer for scaling
DisposeHandler dh;
int            xres = 24, yres = 60, scale = 10, mx, mw;
 
void setup() {
  //size(xres * scale, yres * scale, P2D);
  //tim code
  size(900, 900, P2D);
  //
  g = createGraphics(xres, yres, P2D);
 
  opc = new OPC(this, "192.168.1.26", 7890);
  dh  = new DisposeHandler(this);
  
  
  /*for(int x=0; x<xres; x++) {
    opc.ledStrip(x * yres, 60, (x + 0.5) * scale,
      height * 0.5, scale, PI / 2.0, false);
  }*/
  
  opc.ledGrid(0, 9, 9, width/2, height/2, 50, 50, 0, true);
 
  selectInput("Select a file to process:", "fileSelected");
}
 
void fileSelected(File selection) {
  if(selection == null) exit();
  movie = new Movie(this, selection.getAbsolutePath());
  movie.loop();
  mw = (int)((float)yres * ((float)movie.width / (float)movie.height));
  mx = (xres - mw) / 2;
}
 
void movieEvent(Movie m) {
  m.read();
}
 
void draw() {
  if(movie == null) {
    background(0);
  } else {
    g.beginDraw();
    g.image(movie, mx, 0, mw, g.height); // movie->buf scale/crop
    g.endDraw();
    image(g, 0, 0, width, height); // buf->window scale
  }
}
 
public class DisposeHandler { // LEDs off when exiting
  DisposeHandler(PApplet pa) {
    pa.registerMethod("dispose", this);
  }
  public void dispose() {
    for(int i=0; i < xres * yres; i++) opc.setPixel(i, 0);
    opc.writePixels();
  }
}
