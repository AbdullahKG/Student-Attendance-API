const { SerialPort, ReadlineParser } = require('serialport');

const port = new SerialPort({ path: 'COM4', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (data) => {
  const cardID = data.trim();
  console.log(`Card ID received: ${cardID}`);
});

port.on('error', (err) => {
  console.error('Serial Port Error:', err);
});

console.log('Serial reader initialized.');
