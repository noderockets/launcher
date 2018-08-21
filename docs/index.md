## Node Rocket Launcher

### Overview

The launcher is constructed using 3 valves to:

- Fill the rocket with water
- Pressurize the rocket with air
- Launch the rocket

Each of the valves is controlled by a digital logic pin on the micro controller. By writing `HIGH/LOW` to the pins you can switch the valves `ON` and `OFF`.

- `D0` - Air valve
- `D1` - Water valve
- `D2` - Launch

The pressure (PSI) of the rocket can be calculated using the value read from the analog pin `A0`. See [Calculating PSI of rocket from pressure sensor]() for more information.

For more information on logic pins ...

### Building the Launcher Circuit Board


### Particle Photon

[Particle](https://particle.io) is IoT platform that provides a complete solution for building IoT products.  They provide cloud based api's for communicating and controlling devices.  The [Photon](https://www.particle.io/products/hardware/photon-wifi) is a microcontroller that connects and talks to the Particle cloud via a built in WiFi chip.  We will use the photon to build an application that we can use to control the launcher.

#### Setting up a Photon

After creating a Particle account, you can claim and setup a Photon by using Particle's mobile app or browser-based tools.  You can also use their [CLI](https://docs.particle.io/guide/tools-and-features/cli/photon/) tools to setup and interact with your particle devices.

To get started with your Photon you can follow the [Getting Started](https://docs.particle.io/guide/getting-started/start/photon/) guide.

### Using Tinker to Control the Launcher

// TODO

### Building an Application

Particle provides a [Web IDE](https://docs.particle.io/guide/getting-started/build/photon/) that we can use to build applications for the Photon.  Applications are basically custom firmware that run whenever the device is powered up.  

When you are ready to run your code on your device you can use the the Web IDE to compile and flash the new code onto the photon.

#### Simple App to Control Valve

// TODO

### Using Johnny-Five to build a NodeJS app

