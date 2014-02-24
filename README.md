SPECTROSERVER
=============
> A Spectral Data Visualisation & Spectrophotometer Control Application


A web based real-time application for remote spectrophotometer control and spectral data visualisation using Arduino, NodeJS, Rgraph, MongoDB and Octopress


INSTALLATION
---------------
1. [Install](https://github.com/joyent/node/wiki/installation) [NodeJS](http://nodejs.org)
2. [Install](http://docs.mongodb.org/manual/installation/) [MongoDB](http://mongodb.org)
3. Connect Arduino to Development Computer & Upload ```arduino/specontrol.ino```
4. Install the Application
```sh
$ cd /path/to/working/directory
$ git clone https://github.com/debanjum/Spectroserver.git  # Cloning Repository
$ cd Spectroserver/nodejs
$ npm install	 # Installing Application Dependencies
$ node serve.js	 # Starting NodeJS Server
```
5. Open ```spectra/index.html``` in browser & run application.


CONTRIBUTING
---------------
1. Interface arduino to spectrophotometer and connect to development computer
2. Edit ```nodejs/serve.coffee```, ```spectra/index.html```, ```arduino/specontrol.ino``` etc as required
3. Convert Coffee to JS ```$ coffee -o ./ -c serve.coffee``` & Start Server ```$ node serve.js```
4. Open ```spectra/index.html``` in browser & start testing


DEBUGGING
---------------
###Server Not Starting
1. Make sure arduino connected and ```serve.coffee``` refers to correct arduino serial port. [e.g /dev/ttyACM0]
2. Ensure MongoDB service is running
   + Arch: ```$ sudo systemctl start mongodb && systemctl status mongodb```
   + Ubuntu: ```$ sudo service mongodb start && service mongodb status```
3. Make sure permission on files and ports are set correctly
4. Ensure all applications dependencies installed


BUGS
---------------
Please file bug reports at https://github.com/debanjum/Spectroserver/issues


LICENSE
---------------
This program is free software; it is distributed under the GNU General Public License v3.

[GPLv3](./COPYING) © [debanjum](./AUTHORS)
