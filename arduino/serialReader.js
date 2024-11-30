const { SerialPort, ReadlineParser } = require('serialport');
const { sendCardIDToDevice } = require('../socketio/socket');

const port = new SerialPort({ path: 'COM4', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

let cardID;

parser.on('data', (data) => {
  cardID = data.trim();
  console.log(`Card ID received: ${cardID}`);
  sendCardIDToDevice(cardID);
});

port.on('error', (err) => {
  console.error('Serial Port Error:', err);
});

console.log('Serial reader initialized.');
