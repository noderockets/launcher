# Launcher

This project contains the code for the NodeRocket launcher application.  The application controls the launcher valves for filling air and water, launching the rocket and monitoring the pressure.

The launcher is built using a [Particle Photon](https://particle.io) and can be controlled by either uploading the firmware in the ```photon``` directory and using the Particle Cloud API or by using the application found in the ```app``` directory.  

## Getting Started

### Method 1: Firmware 

You can flash your photon by using the code in the `photon` directory. The best way to do this is to use the [web ide](https://build.particle.io/build/new) from particle.  

 - Open the [Particle WebIDE](https://build.particle.io/build/new)
 - Copy and paste the entire contents of `firmware/src/launcher.ino` into the editor
 - Click Verify
 - Click Flash


Once you have flashed your device with the new firmware you can use the Particle Cloud API to control the launcher.

To open the air valve:
```
curl https://api.particle.io/v1/devices/[[DEVICE ID]]/openAir \
     -d arg=none \
     -d access_token=[[YOUR PARTICLE ACCESS TOKEN]]
```

To close the air valve:
```
curl https://api.particle.io/v1/devices/[[DEVICE ID]]/closeAir \
     -d arg=none \
     -d access_token=[[YOUR PARTICLE ACCESS TOKEN]]
```

To open the water valve:
```
curl https://api.particle.io/v1/devices/[[DEVICE ID]]/openWater \
     -d arg=none \
     -d access_token=[[YOUR PARTICLE ACCESS TOKEN]]
```


To close the water valve:
```
curl https://api.particle.io/v1/devices/[[DEVICE ID]]/closeWater \
     -d arg=none \
     -d access_token=[[YOUR PARTICLE ACCESS TOKEN]]
```

To launch:
```
curl https://api.particle.io/v1/devices/[[DEVICE ID]]/launch \
     -d arg=none \
     -d access_token=[[YOUR PARTICLE ACCESS TOKEN]]
```

To get the current pressure:

```
curl https://api.particle.io/v1/devices/[[DEVICE ID]]/pressure?access_token=[[YOUR PARTICLE ACCESS TOKEN]]
```

### Method 2: Application

The launcher application uses the excellent [Johnny-Five library](http://johnny-five.io/) to connect to the Particle Photon and issue remote commands to it.  It allows us to write the logic in JavaScript.  


In order to use the application you must first flash your photon with the `voodoospark` firmware.  For more information on how to do this, follow the instructions [here](https://github.com/voodootikigod/voodoospark#loading-the-firmware).  

Next you need to supply a `config.json` file that contains the following:

```json
{
  "particle": {
    "token": "[[YOUR PARTICLE ACCESS TOKEN]]",
    "deviceId": "[[DEVICE ID OF YOUR PHOTON]]"
  }
}
```

To start the application, run the command:

```
node app/run.js
```
