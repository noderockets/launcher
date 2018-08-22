# Particle Photon

[Particle](https://particle.io) is IoT platform that provides a complete solution for building IoT products.  They provide cloud based api's for communicating and controlling devices.  The [Photon](https://www.particle.io/products/hardware/photon-wifi) is a microcontroller that connects and talks to the Particle cloud via a built in WiFi chip.  We will use the photon to build an application that we can use to control the launcher.

For the rocket launcher activity, you will need to follow the steps below:

1. You will need to setup a particle account. Go to https://login.particle.io/signup and create your free account. 

2. Install the particle mobile app.

3. Claim the Photon. The mobile app has a '+' in the top right corner. Select that symbol and choose 'Photon'. Follow the instructions to claim and setup the photon.

  You can also use their [CLI](https://docs.particle.io/guide/tools-and-features/cli/photon/) tools to setup and interact with your particle devices.


4. Use Tinker to control the launcher.

After setting up the photon, then you can use the same particle app to control the photon. 

Go back to the mobile app and you should see the new photon that you claimed on the app. Select that photon and you will enter tinker mode.

In tinker mode, select the D7 pin. Choose "digital write" mode. Then you can toggle that pin to high and low. This will turn on and off an LED mounted on the chip.

5. Test the PC board.
Mount your particle photon in one of the PC boards. 
Connect to power. 
Use tinker to configure D0, D1 and D2 in "digital Write" mode.

Toggle the D0, D1 and D2 pins. You should see the Green, Blue and Red LEDs activate.

Now you are ready to try it on the launcher!

More documentation can be found here:

https://docs.particle.io/guide/getting-started/start/core/#step-1-power-on-your-device