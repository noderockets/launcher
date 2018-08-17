const int launchPin = D2;
const int airPin = D1;
const int waterPin = D0;
const int pressurePin = A0;

const double slope = .54789;
const double yint = -2.22689;

double pressure = 0;
int VERSION = 1.0;

LEDStatus blinkRed(RGB_COLOR_RED, LED_PATTERN_BLINK, LED_SPEED_FAST);
LEDStatus blinkBlue(RGB_COLOR_BLUE, LED_PATTERN_BLINK, LED_SPEED_FAST);
LEDStatus blinkGreen(RGB_COLOR_GREEN, LED_PATTERN_BLINK, LED_SPEED_FAST);

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

    // Particle.subscribe("panic", panicHandler);
    Particle.variable("version", VERSION);
}

void loop()
{
    int pinValue = analogRead(pressurePin);
    pressure = pinValue;

    photon reads voltage in increments of 1/4095 of 3.3v
    double voltage = pinValue * 3.3 / 4095;

    // voltage divider solve for z2 with vin = 3.3 and z1 = 270
    double z2 = 270 / ((3.3 / voltage) - 1);

    // // use linear equation with confirmed slope and y-intercept to
    // // solve for pressure
    pressure = (z2 * slope) - yint;
}

int airValveOpen(String command)
{
    blinkBlue.setActive(true);
    Particle.publish("air-valve-open");
    digitalWrite(airPin, HIGH);
    return 1;
}

int airValveClose(String command)
{
    blinkBlue.setActive(false);
    Particle.publish("air-valve-close");
    digitalWrite(airPin, LOW);
    return 1;
}

int waterValveOpen(String command)
{
    blinkGreen.setActive(true);
    Particle.publish("water-valve-open");
    digitalWrite(waterPin, HIGH);
    return 1;
}

int waterValveClose(String command)
{
    blinkGreen.setActive(false);
    Particle.publish("water-valve-close");
    digitalWrite(waterPin, LOW);
    return 1;
}

int launch(String command)
{
    Particle.publish("fire");
    blinkRed.setActive(true);
    digitalWrite(launchPin, HIGH);
    delay(500);
    digitalWrite(launchPin, LOW);
    blinkRed.setActive(false);
    return 1;
}

// void panicHandler(const char *event, const char *data) {
//     stop("panic");
// }
