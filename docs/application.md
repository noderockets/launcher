# Building an Application

## Getting Started
Particle provides a [Web IDE](https://docs.particle.io/guide/getting-started/build/photon/) that you can use to build applications for the Photon.  Applications are basically custom firmware that run whenever the device is powered up.  

Native applications for the photon are written using a C++ like language and are very much like Arduino [sketches](https://www.arduino.cc/en/Tutorial/Sketch). The two main parts of an application is the `setup` and `loop` functions.  The `setup` function runs once when the device is first powered on the `loop` runs continuously.  

#### Example: Blinking an LED

```c++
int led = D7;  // Built in LED on photon

void setup(){
  // Tell the device that the led pin is in OUTPUT mode
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH); // Turn on
  delay(1000);
  digitalWrite(led, LOW); // Turn off
  delay(1000);
}
```

When you are ready to run your code on your device you can use the the Web IDE to compile and flash the new code onto the photon.

For more detailed information on building applications for the [Getting Started](https://docs.particle.io/guide/getting-started/build/photon/) tutorials or [Code Examples](https://docs.particle.io/guide/getting-started/examples/photon/) on Particle's site.

## Using Particle's Cloud API

Particle has libraries for writing firmware that can allow you to control your device using a REST api. For example, let's say you wanted to turn the LED on and off by hitting an endpoint.  Particle makes this really easy using their [API](https://docs.particle.io/reference/firmware/photon).

#### Example: Expose cloud endpoints
```c++
int led = D7;  // Built in LED on photon
bool on = false;

void setup(){
  pinMode(led, OUTPUT);

  // Register cloud functions

  // POST /v1/devices/{DEVICE_ID}/on
  Particle.function("on", on);    

  // POST /v1/devices/{DEVICE_ID}/off
  Particle.function("off", off);  

  // GET  /v1/devices/{DEVICE_ID}/isOn
  Particle.variable("isOn", on);  
}

void loop() {}

int on(String command) {
  digitalWrite(led, HIGH); // Turn on
  return 0;
}

int off(String command) {
  digitalWrite(led, LOW); // Turn on
  return 0;
}
```

In order to call the endpoints you need to know your `DEVICE_ID` and `ACCESS_TOKEN`, both which you can get from the Particle Web IDE.

```bash
# Turn LED ON
curl https://api.particle.io/v1/devices/{DEVICE_ID}/on \
     -d access_token={ACCESS_TOKEN} \
     -d "args=none"

# Turn LED OFF
curl https://api.particle.io/v1/devices/{DEVICE_ID}/off \
     -d access_token={ACCESS_TOKEN} \
     -d "args=none"

# Get state
curl "https://api.particle.io/v1/devices/{DEVICE_ID}/isOn?access_token={ACCESS_TOKEN}"
```

## Launcher Firmware

The launcher firmware is basically an extension of these concepts.  We output to 3 digital pins to control each of the different valves.  `D0`, `D1`, and `D2`.  We also use an analog pin `A0` to read the value of the pressure sensor.

```c++
const int launchPin = D2;
const int airPin = D1;
const int waterPin = D0;
const int pressurePin = A0;

double pressure = 0;

void setup()
{
    // Setup PINs
    pinMode(launchPin, OUTPUT);
    pinMode(airPin, OUTPUT);
    pinMode(waterPin, OUTPUT);
    pinMode(pressurePin, INPUT);

    // Initialize
    digitalWrite(launchPin, LOW);
    digitalWrite(airPin, LOW);
    digitalWrite(waterPin, LOW);

    // Expose functions
    Particle.function("openAir", airValveOpen);
    Particle.function("closeAir", airValveClose);
    Particle.function("openWater", waterValveOpen);
    Particle.function("closeWater", waterValveClose);
    Particle.function("launch", launch);
    Particle.variable("pressure", pressure);
}

void loop()
{
    int pinValue = analogRead(pressurePin);
    pressure = pinValue;
}

int airValveOpen(String command)
{
    digitalWrite(airPin, HIGH);
    return 1;
}

int airValveClose(String command)
{
    digitalWrite(airPin, LOW);
    return 1;
}

int waterValveOpen(String command)
{
    digitalWrite(waterPin, HIGH);
    return 1;
}

int waterValveClose(String command)
{
    digitalWrite(waterPin, LOW);
    return 1;
}

int launch(String command)
{
    digitalWrite(launchPin, HIGH);
    delay(500);
    digitalWrite(launchPin, LOW);
    return 1;
}
```

```bash
# Open Air Valve
curl "https://api.particle.io/v1/devices/{DEVICE_ID}/airOpen" \
     -d access_token={ACCESS_TOKEN} \
     -d "args=none"

# Close Air Valve
curl "https://api.particle.io/v1/devices/{DEVICE_ID}/airClose" \
     -d access_token={ACCESS_TOKEN} \
     -d "args=none"

# Get Pressure Value
curl "https://api.particle.io/v1/devices/{DEVICE_ID}/pressure?access_token={ACCESS_TOKEN}"
```
