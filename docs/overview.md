## Overview

The launcher is constructed using 3 valves to:

- Fill the rocket with water
- Pressurize the rocket with air
- Launch the rocket

Each of the valves is controlled by a digital logic pin on the micro controller. By writing `HIGH/LOW` to the pins you can switch the valves `ON` and `OFF`.

- `D0` - Air valve
- `D1` - Water valve
- `D2` - Launch

The pressure (PSI) of the rocket can be calculated using the value read from the analog pin `A0`.  See [Calculating PSI of rocket from pressure sensor]() for more information.
