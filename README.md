# Computer Serial

This code is associated with my [Advent Calendar 2018 Project](https://www.sammeechward.com/youtube-projects/advent-calendar-2018).
And the [Advent Calendar 2018 Code](https://github.com/Sam-Meech-Ward/Advent_Calendar_2018)

This module syncs the date and time to whichever device requests it, in this case, an Arduino.

## Files

* `app.js`: listens for the `#date` message and send a timestamp.
* `serial.js`: handles all serial connections and messages.
* `listener.js`: just listens for any messages sent from the arduino.

## How it works

When an Arduino UNO sends the following message over a serial connection:

```
#date
```

This script will send the current date as a Unix EPOCH timestamp as a string, prepended with `timestamp`. So a full response message will look like this:

```
timestamp:1543497377
```


