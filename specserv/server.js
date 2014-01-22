var SerialPort = require("serialport").SerialPort
var serialport = new SerialPort("/dev/ttyACM0", 
								{ 
									baudRate: 57600	, 
									dataBits: 8		, 
									stopBits: 1		, 
									parity: 'none'	, 
									flowControl: false 
								});

var io = require('socket.io').listen(7000); // server listens for socket.io communication at specified port
io.set('log level', 1); 					// disables debugging. this is optional. you may remove it if desired.

var debug		=	false 	;
var ard_data	=	"$"		;
var scan		=	"$"		;
var resetspec	=	"$"		;

io.sockets.on('connection', function (socket) {
    
    socket.on ('message', function (msg)	// If socket.io receives message from the client browser then 
    { 										// this call back will be executed.    
		if ( debug == true ) console.log(msg); 
	});	
																	
    socket.on ('disconnect', function ()	// If a web browser disconnects from Socket.IO 
    {										//then this callback is called.
		if ( debug == true ) console.log('Disconnected'); 
	});																			

	socket.on ('initspec', function (startwave,stopwave) 
	{ 	
		ard_data="#0!" + startwave + stopwave + "." ; 
		if ( debug == true ) console.log(startwave,stopwave, ard_data) ;
		( ( sf == true ) ?  serialport.write(ard_data) : socket.emit('sff') );
	});
		
	socket.on ('scanspec', function () 
	{ 	
		scan="#1!.";
		if ( debug == true ) console.log(scan);
		( ( sf == true ) ?  serialport.write(scan) : socket.emit('sff') );		
	});
		
	socket.on('resetspec', function ()
	{
		resetspec="#2!."
		if ( debug == true ) console.log(resetspec);
		( ( sf == true ) ?  serialport.write(resetspec) : socket.emit('sff') );	
	});
		
});

var cleanData = ''; // this stores the clean data
var readData = '';  // this stores the buffer
var sf = false ;
serialport.on ('open', function ()
{
	sf = true ;
	if ( debug == true ) console.log('Open');
	
	serialport.on('data', function (data)	//Serial Read: Reading data from Arduino
	{
		readData += data.toString(); 
		
		if ( debug == true ) console.log('Data Recieved : ' + readData) ;
		
		if (readData.indexOf('A') >= 0 && readData.indexOf('B') >= 0 ) 
		{
			cleanData = readData.substring(readData.indexOf('A') + 1, readData.indexOf('B'));
			readData = '';
			io.sockets.emit('d', cleanData);			
		}
		
		if ( debug == true ) console.log('Message : ' + cleanData) ;
		
	cleanData = '';	
	});
});
