{SerialPort}  =   require('serialport')
fs 			      =   require 'fs'
express 	    =   require 'express'
io 			      =   require 'socket.io'
http 		      =   require 'http'
redis         =   require 'redis'
redses        =   require('connect-redis')(express)
client        =   redis.createClient #'/var/run/redis/redis.sock'
mongoose      =   require 'mongoose'


port 		      =   '/dev/ttyACM0'
serialport	  =   null
debug		      =	  false
ard_data	    =	  "$"
scan	        =	  "$"
resetspec	    =	  "$"

# Connect to DB
mongoose.connect('mongodb://localhost/spectra');

# Creating Schema
SpectraSchema = new mongoose.Schema(
  key: { type: Number, min: 0 }
  value: { type: Number, min: 0 }
  )
# Creating Model 'SpectraSchema' in 'Spectra' Collection
Spectra = mongoose.model "Spectra", SpectraSchema

# Server listens for get requests, socket.io communication at http port
app = express()
server = http.createServer app
server.listen 7000
io = io.listen server
io.set 'log level', 1

# Session configuration
app.use express.static(__dirname + '/public')
app.use express.cookieParser()
#app.use express.session {secret: "CoffeeSpectrum", store: new redses({client: client, db: 2}), cookie: { maxAge: 60000 } }
#app.use express.session {secret: "CoffeeSpectrum", cookie: { maxAge: 60000 } }
app.set 'view engine', 'jade'

# Routes
app.get '/', (req, res) ->
    res.sendfile __dirname + '/public/client.html'
    req.session.views++ #Sessions Counter [testing]
    
app.get '/libraries/RGraph.line.js', (req, res) ->
    res.sendfile __dirname + '/libraries/RGraph.line.js'
    
app.get '/libraries/RGraph.common.core.js', (req, res) ->
    res.sendfile __dirname + '/libraries/RGraph.common.core.js'
    
# Socket Signal
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
		scanspec = "#1!."
		if debug is true then console.log scanspec
		if sf is true then serialport.write scanspec else socket.emit 'sff'
		
	socket.on 'resetspec', ->
		resetspec = "#2!."
		if debug is true then console.log resetspec
		if sf is true then serialport.write resetspec else socket.emit 'sff'

	socket.on 'savespec', (startwave,stopwave,spectra) ->
		savespec = "#3!."
		if debug is true then console.log startwave,stopwave
		
		# Storing Spectra in Database [if can't pass "spectra" array then pass each value whenever recieved for each value and save only when button pressed]
		for wavelength in [startwave..stopwave]
			Spec = new Spectra ( key: wavelength, value: spectra[wavelength] )       # storing data in spec collection
			`Spec.save(function (err) {if (err) console.log ('Error on spectrum save!')});`		# saving to filesystem w/ error catching
			i = i + 5																			# wavelength step size

		# Creating Redis Database ??
			#`client.select(2, function (err,log) { console.log(err,log); });` # Selecting redis DB; Default is 0
			#`client.rpush('spectra', spectra);`
				#OR
			#client.rpush.apply(client, ['spectra'].concat(spectra).concat(function(err, ok){ console.log(err, ok); }));

cleanData = '' # this stores the clean data
readData = ''  # this stores the buffer
sf = false     # flag to write to serialport, for communicating with arduino, ...

# Checking arduino connected to usb port
console.log "Starting..."

# Checking Port
fs.stat port, (err, stats) ->
	if err?
		console.log "Couldn't stat #{port}"
		process.exit()
	
	# Opening serial port
	console.log "Started."
	serialport = new SerialPort port, baudrate: 57600, dataBits: 8, stopBits: 1, parity: 'none', flowControl: false 
	
	# Port open
	serialport.on 'open', ->
		sf = true
		if debug is true then console.log 'Open'
	
		# Serial Read: Reading data from Arduino
		serialport.on 'data', (data) ->
			readData += data.toString() 
			if debug is true then console.log 'Data Recieved : ' + readData
			
			# Parsing Data from string recieved
			if `readData.indexOf('A') >= 0 && readData.indexOf('B') >= 0`
				cleanData = `readData.substring(readData.indexOf('A') + 1, readData.indexOf('B'))`
				readData  = ''
				io.sockets.emit 'data', cleanData
			if debug is true then console.log 'Message : ' + cleanData
		
		cleanData = ''
