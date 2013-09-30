var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyACM0", { baudrate: 9600, baudRate: 9600, dataBits: 8, stopBits: 1, parity: 'none', flowControl: false });

var io = require('socket.io').listen(8000); // server listens for socket.io communication at port 8000
io.set('log level', 0); // disables debugging. this is optional. you may remove it if desired.

io.sockets.on('connection', function (socket) {
    // If socket.io receives message from the client browser then 
    // this call back will be executed.
    socket.on
    ('message', 
	function (msg) 
	{
		console.log(msg);
	}
	);
    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on
    ('disconnect', 
    function () 
    {
        console.log('Disconnected');
    }
    );
});

var cleanData1 = ''; // this stores the clean data
var cleanData2 = ''; // this stores the clean data
var cleanData3 = ''; // this stores the clean data
var readData = '';  // this stores the buffer

serialPort.on ('open', function ()
{
	console.log('Open');
	serialPort.on('data', function (data)
	{
		readData += data.toString(); 
		console.log('Data Recieved : ' + readData);			
		if (readData.indexOf('A') >= 0 && readData.indexOf('B') >= 0 && readData.indexOf('C')>=0 && readData.indexOf('\n')>=0) 
		{
			cleanData1 = readData.substring(readData.indexOf('A') + 1, readData.indexOf('B'));
			cleanData2 = readData.substring(readData.indexOf('B') + 1, readData.indexOf('C'));
			cleanData3 = readData.substring(readData.indexOf('C') + 1, readData.indexOf('\n'));
			readData = '';
			io.sockets.emit('cm1', cleanData1);
			io.sockets.emit('cm2', cleanData2);
			io.sockets.emit('cm3', cleanData3);
		}
		console.log('Message : ' + cleanData1 + cleanData2 + cleanData3);
	});
});
