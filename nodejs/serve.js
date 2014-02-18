(function() {
  var SerialPort, Spectra, SpectraSchema, app, ard_data, cleanData, client, debug, express, fs, http, io, mongoose, port, readData, redis, redses, resetspec, scan, serialport, server, sf;

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

  debug = false;

  ard_data = "$";

  scan = "$";

  resetspec = "$";

  mongoose.connect('mongodb://localhost/spectra');

  SpectraSchema = new mongoose.Schema({
    key: {
      type: Number,
      min: 0
    },
    value: {
      type: Number,
      min: 0
    }
  });

  Spectra = mongoose.model("Spectra", SpectraSchema);

  app = express();

  server = http.createServer(app);

  server.listen(7000);

  io = io.listen(server);

  io.set('log level', 1);

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
      var Spec, i, savespec, wavelength, _results;
      savespec = "#3!.";
      if (debug === true) console.log(startwave, stopwave);
      _results = [];
      for (wavelength = startwave; startwave <= stopwave ? wavelength <= stopwave : wavelength >= stopwave; startwave <= stopwave ? wavelength++ : wavelength--) {
        Spec = new Spectra({
          key: wavelength,
          value: spectra[wavelength]
        });
        Spec.save(function (err) {if (err) console.log ('Error on spectrum save!')});;
        _results.push(i = i + 5);
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
