const serial = require('./serial');

function now() {
  return Date.now()/1000|0;
}

function readData(port, data) {
  if (data.startsWith("#date")) {
    serial.sendMessage(port, `timestamp:${now()}`);
  }
  console.log("Data:", data);
}
function portError(error) {
  throw error;
}

const vendorIds = {
  mini: '0403',
  uno: '1a86'
}
serial.openSerialPort(vendorIds.uno, readData, portError);