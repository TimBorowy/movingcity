OPC opc;
PImage[] aquarius = new PImage[5];
PImage currentImage;
int loop;
int cycle;
DisposeHandler dh;
OPCRecorder opcrecorder;

void setup()
{
  size(450, 450);
  frameRate(20);
  
  aquarius[0] = loadImage("data/aquarius_pink.jpg");
  aquarius[1] = loadImage("data/aquarius_red.jpg");
  aquarius[2] = loadImage("data/aquarius_purple.jpg");
  aquarius[3] = loadImage("data/aquarius_blue.jpg");
  aquarius[4] = loadImage("data/aquarius_orange.jpg");
  
  currentImage = aquarius[0];
  loop = 0;
  cycle = 1;

  // Connect to the local instance of fcserver. You can change this line to connect to another computer's fcserver
  opc = new OPC(this, "192.168.1.25", 7890);
  opc.ledGrid(0, 9, 9, width/2, height/2, 50, 50, 0, true);
  
  // Record current OPC output to local file
   opcrecorder = new OPCRecorder(this, "D:\\dev\\movingcity\\starrysky1.opc");
   opcrecorder.setFrameRate(20);
   opc.enableOPCRecording(false);
  
  dh  = new DisposeHandler(this);
}

void draw()
{
  loop++;
  
  background(0);
  
  // Defines how long a loop is
  float frame = loop % 3601;

  // image size
  float size = 480;

  imageMode(CENTER);
  
  //Zoom a bit to prevent black corners when rotating
  //scale(1.2);
  
  // Rotate and translate the actual image
  translate(450/2, 450/2);
  float rad = radians(frame/10);
  rotate(rad);
  
  // Change hue of image
  // tint(260, 100, 50, 255);
  
  // Once a loop, select next image
  if(frame == 3600){
    
    // 5 equals to amount of items in the image array
    int i = cycle++ % 5; 
    currentImage = aquarius[i];
  }
  
  image(currentImage, 0, 0, size, size);
  
  // Speed
  delay(1);
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
