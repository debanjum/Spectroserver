{SerialPort}  =   require('serialport')
fs 			      =   require 'fs'
express 	    =   require 'express'
io 			      =   require 'socket.io'
http 		      =   require 'http'
mongoose      =   require 'mongoose'


port 		      =   '/dev/ttyACM0'
serialport	  =   null
debug		      =	  true
ard_data	    =	  "$"
scan	        =	  "$"
resetspec	    =	  "$"

# Connect to DB
mongoose.connect('mongodb://localhost/spectra');
db = mongoose.connection
`db.on('error', console.error.bind(console, 'connection error:'));`
`db.once('open', function callback () { console.log('Conntected To Mongo Database'); });`

# Creating Schema
SpectrumSchema = new mongoose.Schema(
  spectrum_id: { type: Number, min: 0 }
  wavelength: { type: Number, min: 0 }
  intensity: { type: Number, min: 0 }
  )

# Creating Model 'Spectrum' with 'SpectrumSchema' Schema
Spectrum = mongoose.model 'Spectrum', SpectrumSchema 

# Creating Document with Model
spectrum = new Spectrum

# For Removing All Documents in Model
#`Spectrum.remove(function (err, spectrum) { if (err) { return handleError(err); }  Spectrum.findById(spectrum._id, function (err, spectrum) { console.log(spectrum); }) })`

# For Finding All Documents in Model
# `Spectrum.find(function (err, spectrum) { if (err) { console.log(err); } else { console.log(spectrum); } })` # Mongoose Find 

# Server listens for get requests, socket.io communication at http port
app = express()
server = http.createServer app
server.listen 7000
io = io.listen server
io.set 'log level', 3

# Session configuration
app.use express.static(__dirname + '/spectra')
app.use express.cookieParser()
app.set 'view engine', 'jade'

# Routes
app.get '/', (req, res) ->
    res.sendfile __dirname + '/spectra/index.html'
    req.session.views++

app.get '/spectra/images/social/github.png', (req, res) ->
    res.sendfile __dirname + '/spectra/images/social/github.png'

app.get '/spectra/images/social/rss.png', (req, res) ->
    res.sendfile __dirname + '/spectra/images/social/rss.png'

app.get '/spectra/font/fontawesome-webfont.ttf', (req, res) ->
    res.sendfile __dirname + '/spectra/font/fontawesome-webfont.ttf'
    
app.get '/spectra/favicon.png', (req, res) ->
    res.sendfile __dirname + '/spectra/favicon.png'
    
app.get '/spectra/atom.xml', (req, res) ->
    res.sendfile __dirname + '/spectra/atom.xml'
    
app.get '/spectra/images/test.svg', (req, res) ->
    res.sendfile __dirname + '/spectra/images/test.svg'

app.get '/spectra/javascripts/snap.svg-min.js', (req, res) ->
	res.sendfile __dirname + '/spectra/javascripts/snap.svg-min.js'
	
app.get '/spectra/javascripts/RGraph.line.js', (req, res) ->
    res.sendfile __dirname + '/spectra/javascripts/RGraph.line.js'
    
app.get '/spectra/javascripts/RGraph.common.core.js', (req, res) ->
    res.sendfile __dirname + '/spectra/javascripts/RGraph.common.core.js'

app.get '/spectra/javascripts/jquery.fancybox.pack.js', (req, res) ->
    res.sendfile __dirname + '/spectra/javascripts/jquery.fancybox.pack.js'
    
app.get '/spectra/stylesheets/screen.css', (req, res) ->
    res.sendfile __dirname + '/spectra/stylesheets/screen.css'
    
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
		start = parseInt startwave
		stop = parseInt stopwave
		spectrum_id= parseInt Date.now()			#Get Spectra Set Identifier
		
		# Storing Spectra in Database
		for wavelength in [start..stop] by 5
			i = 999 - (stopwave - wavelength)
			spectrum = new Spectrum					# Creating Document 'spectrum' from Model 'Spectrum'
			spectrum.spectrum_id = spectrum_id		# Spectrum Set Identifier
			spectrum.wavelength = wavelength
			spectrum.intensity = spectra[i]
			`spectrum.save(function (err, spectrum) { if (err) { console.log(err); } })`	# Save Spectra Document to MongoDB
	
		# For Finding All Documents in Model
		`Spectrum.find(function (err, spectrum) { if (err) { console.log(err); } else { console.log(spectrum); } })` # Mongoose Find
		
	socket.on 'openspec', (openw) ->
		openspec = "#4!."
		if debug is true then console.log openspec
		`Spectrum.find({ 'spectrum_id': openw }, 'wavelength intensity', function (err, spectrum) 
		{
		 if (err) return handleError(err); 
		 console.log(spectrum[0].wavelength, spectrum[0].intensity)
		 for(i=0; i<spectrum.length; i++)
		 {
		 	socket.emit('data', spectrum[i].intensity);
			console.log('Message : ' + spectrum[i].intensity);
		 }})`
		
			
			
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
