const SerialPort = require('serialport');

function findSerialName(vendorId) {
  return SerialPort.list()
  .then((ports) => {
    console.log(ports);
    for (const port of ports) {
      if (port.vendorId === vendorId) {
        return port;
      }
    }
    throw `No port with vendorId ${vendorId}`;
  }).then(port => port.comName);
}

function handlePortEvents(port, readcb, errorcb) { 
  port.open(function (err) {
    if (err) {
      return errorcb('Error opening port: ', err.message)
    }
  })

  port.on('readable', function () {
    readcb(port, port.read().toString().trim().toLowerCase());
  });

  // Open errors will be emitted as an error event
  port.on('error', function(err) {
    errorcb(err, port);
  });

  return port;
}

function openSerialPort(vendorId, readcb, errorcb) {
  return findSerialName(vendorId)
  .then((portName) => {
    return new SerialPort(portName, {
      baudRate: 57600,
      autoOpen: false 
    });
  }).then((port) => {
    return handlePortEvents(port, readcb, errorcb)
  });
}
exports.openSerialPort = openSerialPort;

function sendMessage(port, message) {
  return new Promise((resolve, reject) => {

    if (typeof message !== 'string') {
      message = String(message);
    }

    port.write(message, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve('message written');
    })
  });
}
exports.sendMessage = sendMessage;


