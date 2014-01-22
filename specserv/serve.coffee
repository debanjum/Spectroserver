{SerialPort} = 	require('serialport')
fs 			= 	require 'fs'
express 	= 	require 'express'
io 			= 	require 'socket.io'
http 		=  	require 'http'

port 		= 	'/dev/ttyACM0'
serialport	= 	null
debug		=	false
ard_data	=	"$"
scan		=	"$"
resetspec	=	"$"

# Server listens for get requests, socket.io communication at http port
app = express()
server = http.createServer app
server.listen 7000
io = io.listen server
io.set 'log level', 1

app.get '/', (req, res) ->
    res.sendfile __dirname + '/client.html'

app.get '/libraries/RGraph.line.js', (req, res) ->
    res.sendfile __dirname + '/libraries/RGraph.line.js'
    
app.get '/libraries/RGraph.common.core.js', (req, res) ->
    res.sendfile __dirname + '/libraries/RGraph.common.core.js'
    
io.sockets.on 'connection', (socket) ->
	socket.on 'message', (msg) ->
		if debug is true then console.log msg
		
	socket.on 'disconnect', ->
		if debug is true then console.log 'Disconnected'
		
	socket.on 'initspec', (startwave,stopwave) ->
		ard_data = "#0!" + startwave + stopwave + "."
		if debug is true then console.log startwave, stopwave, ard_data
		if sf is true then serialport.write ard_data else socket.emit 'sff'
		
	socket.on 'scanspec', ->
		scan = "#1!."
		if debug is true then console.log scan
		if sf is true then serialport.write scan else socket.emit 'sff'
		
	socket.on 'resetspec', ->
		resetspec = "#2!."
		if debug is true then console.log resetspec
		if sf is true then serialport.write resetspec else socket.emit 'sff'

cleanData = '' # this stores the clean data
readData = ''  # this stores the buffer
sf = false

#Checking arduino connected to usb port
console.log "Starting..."

fs.stat port, (err, stats) ->
	if err?
		console.log "Couldn't stat #{port}"
		process.exit()
 
	console.log "Started."
	serialport = new SerialPort port, baudrate: 57600, dataBits: 8, stopBits: 1, parity: 'none', flowControl: false 
	
	serialport.on 'open', ->
		sf = true
		if debug is true then console.log 'Open'
	
		# Serial Read: Reading data from Arduino
		serialport.on 'data', (data) ->
			readData += data.toString() 
			if debug is true then console.log 'Data Recieved : ' + readData
	
			if `readData.indexOf('A') >= 0 && readData.indexOf('B') >= 0`
				cleanData = `readData.substring(readData.indexOf('A') + 1, readData.indexOf('B'))`
				readData  = ''
				io.sockets.emit 'd', cleanData
			if debug is true then console.log 'Message : ' + cleanData
		
		cleanData = ''
