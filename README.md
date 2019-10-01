# Movingcity
A code repository for all animations, configs and other stuffs that has to do with my fadecandy artproject

## Setting up your PI

Uses [BerryLan](https://github.com/nymea/berrylan) for quick and easy network setup.

Flash the image on an SD card using Balena Etcher

Follow the fadecandy server setup over at 
[adafruit.com](https://learn.adafruit.com/1500-neopixel-led-curtain-with-raspberry-pi-fadecandy/fadecandy-server-setup)

use the serverconfig.json file as config for the server. You need to change the serial to your own fadecandy serial string.

### Other things

-   Change password
-   Set rasbian to CLI and,
-   Enter the command `sudo raspi-config` . Scroll down to Boot Options and select Console Autologin. Then exit the configuration menu and reboot.


### Links:

Fadecandy disconnects, maybe non clean power

https://github.com/scanlime/fadecandy/issues/112

How to test for clean power

https://forum.arduino.cc/index.php?topic=476877.0

Pi accesspoint

https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md





