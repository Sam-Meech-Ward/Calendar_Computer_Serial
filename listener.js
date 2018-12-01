const serial = require('./serial');

function readData(port, data) {
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