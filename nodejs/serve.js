(function() {
  var SerialPort, Spectrum, SpectrumSchema, app, ard_data, cleanData, client, db, debug, express, fs, http, io, mongoose, port, readData, redis, redses, resetspec, scan, serialport, server, sf, spectrum;

  SerialPort = require('serialport').SerialPort;

  fs = require('fs');

  express = require('express');

  io = require('socket.io');

  http = require('http');

  redis = require('redis');

  redses = require('connect-redis')(express);

  client = redis.createClient;

  mongoose = require('mongoose');

  port = '/dev/ttyACM0';

  serialport = null;

  debug = true;

  ard_data = "$";

  scan = "$";

  resetspec = "$";

  mongoose.connect('mongodb://localhost/spectra');

  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));;

  db.once('open', function callback () { console.log('Conntected To Mongo Database'); });;

  SpectrumSchema = new mongoose.Schema({
    spectrum_id: {
      type: Number,
      min: 0
    },
    wavelength: {
      type: Number,
      min: 0
    },
    intensity: {
      type: Number,
      min: 0
    }
  });

  Spectrum = mongoose.model('Spectrum', SpectrumSchema);

  spectrum = new Spectrum;

  app = express();

  server = http.createServer(app);

  server.listen(7000);

  io = io.listen(server);

  io.set('log level', 3);

  app.use(express.static(__dirname + '/public'));

  app.use(express.cookieParser());

  app.set('view engine', 'jade');

  app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/client.html');
    return req.session.views++;
  });

  app.get('/libraries/RGraph.line.js', function(req, res) {
    return res.sendfile(__dirname + '/libraries/RGraph.line.js');
  });

  app.get('/libraries/RGraph.common.core.js', function(req, res) {
    return res.sendfile(__dirname + '/libraries/RGraph.common.core.js');
  });

  io.sockets.on('connection', function(socket) {
    socket.on('message', function(msg) {
      if (debug === true) return console.log(msg);
    });
    socket.on('disconnect', function() {
      if (debug === true) return console.log('Disconnected');
    });
    socket.on('initspec', function(startwave, stopwave) {
      ard_data = "#0!" + startwave + stopwave + ".";
      if (debug === true) console.log(startwave, stopwave, ard_data);
      if (sf === true) {
        return serialport.write(ard_data);
      } else {
        return socket.emit('sff');
      }
    });
    socket.on('scanspec', function() {
      var scanspec;
      scanspec = "#1!.";
      if (debug === true) console.log(scanspec);
      if (sf === true) {
        return serialport.write(scanspec);
      } else {
        return socket.emit('sff');
      }
    });
    socket.on('resetspec', function() {
      resetspec = "#2!.";
      if (debug === true) console.log(resetspec);
      if (sf === true) {
        return serialport.write(resetspec);
      } else {
        return socket.emit('sff');
      }
    });
    return socket.on('savespec', function(startwave, stopwave, spectra) {
      var i, savespec, start, stop, wavelength, _results;
      savespec = "#3!.";
      if (debug === true) console.log(startwave, stopwave);
      start = parseInt(startwave);
      stop = parseInt(stopwave);
      _results = [];
      for (wavelength = start; wavelength <= stop; wavelength += 5) {
        i = 999 - (stopwave - wavelength);
        spectrum = new Spectrum;
        spectrum.spectrum_id = parseInt(Date.now() / 10);
        spectrum.wavelength = wavelength;
        spectrum.intensity = spectra[i];
        _results.push(spectrum.save(function (err, spectrum) { if (err) { console.log(err); } }));
      }
      return _results;
    });
  });

  cleanData = '';

  readData = '';

  sf = false;

  console.log("Starting...");

  fs.stat(port, function(err, stats) {
    if (err != null) {
      console.log("Couldn't stat " + port);
      process.exit();
    }
    console.log("Started.");
    serialport = new SerialPort(port, {
      baudrate: 57600,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      flowControl: false
    });
    return serialport.on('open', function() {
      sf = true;
      if (debug === true) console.log('Open');
      serialport.on('data', function(data) {
        readData += data.toString();
        if (debug === true) console.log('Data Recieved : ' + readData);
        if (readData.indexOf('A') >= 0 && readData.indexOf('B') >= 0) {
          cleanData = readData.substring(readData.indexOf('A') + 1, readData.indexOf('B'));
          readData = '';
          io.sockets.emit('data', cleanData);
        }
        if (debug === true) return console.log('Message : ' + cleanData);
      });
      return cleanData = '';
    });
  });

}).call(this);
