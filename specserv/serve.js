(function() {
  var SerialPort, app, ard_data, cleanData, debug, express, fs, http, io, port, readData, resetspec, scan, serialport, server, sf;

  SerialPort = require('serialport').SerialPort;

  fs = require('fs');

  express = require('express');

  io = require('socket.io');

  http = require('http');

  port = '/dev/ttyACM0';

  serialport = null;

  debug = false;

  ard_data = "$";

  scan = "$";

  resetspec = "$";

  app = express();

  server = http.createServer(app);

  server.listen(7000);

  io = io.listen(server);

  io.set('log level', 1);

  app.get('/', function(req, res) {
    return res.sendfile(__dirname + '/client.html');
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
      scan = "#1!.";
      if (debug === true) console.log(scan);
      if (sf === true) {
        return serialport.write(scan);
      } else {
        return socket.emit('sff');
      }
    });
    return socket.on('resetspec', function() {
      resetspec = "#2!.";
      if (debug === true) console.log(resetspec);
      if (sf === true) {
        return serialport.write(resetspec);
      } else {
        return socket.emit('sff');
      }
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
          io.sockets.emit('d', cleanData);
        }
        if (debug === true) return console.log('Message : ' + cleanData);
      });
      return cleanData = '';
    });
  });

}).call(this);
