/*
 * Copyright 2015 Christian Kawalar, Daniel Schlager
 *
 * This file is part of allevios.io
 *
 * allevios.io is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * allevios.io is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with allevios.io.  If not, see <http://www.gnu.org/licenses/>.
 *
 **/

'use static';



var templateEngine = require('./lib/api/templates/template_engine.js');
var config = require('./config/config.js');
var restC = require('./lib/rest/restClient.js');
var util = require('util');

global.registetThings = {};

var bunyan = require('bunyan');
var logPath = './log.json';
var util = require('util');

var createLog = function(stream){
  global.log = bunyan.createLogger({
    name: "ALLEVIOS DEVICEHUB",
    streams: stream
  });
  if(config.logLvl >= 1){
    global.log['info']('ALLEVIOS DEVICEHUB start');
  }
};

var myArgs = process.argv.slice(2);

/**
 * Check the Arguments
 **/
//Warn and Error logging
if(myArgs.indexOf('-l') > -1){
  config.logLvl = 1;
}
//Full logging, contains also success messages
if(myArgs.indexOf('-L') > -1){
  config.logLvl = 2;
}
//Optional File Path for logfile
if(myArgs.indexOf('-f') > -1){
  logPath = myArgs[myArgs.indexOf('-f')+1];
}

if(myArgs.indexOf('-s') > -1){
  var stream = [{
    level: 'info',
    stream: process.stdout
  }];
  createLog(stream);
} else{
  var stream = [{
    level: 'info',
    path: logPath
  }];
  createLog(stream);
}

if(myArgs.length === 0){
  console.log("Using default logging parameter!");
  console.log("Usage: (all optional)");
  console.log("-l Warn and Error Logging");
  console.log("-L Full logging");
  console.log("-f logfile Path (std: ./log.json)");
  console.log("-s log to stdout");
}


//-------------------------
//Methods
//-------------------------

/*
 * On Start we try first to connect our Allevios Authentication server, and get the actual configuration.
 * If the configuration says we are a Devicehub, the hub opens a socket to the users allevios server.
 * If the configuration says we are a Agent, we start as Agent mode (Mostly the same as devicehub , only that the agent connect to
 * the devices, and is more or less a gateway to our cloud, this is always the chase except the costumer is a enterprise user and has his own appliance.
 * The agent can also start in a fallback mode, if he cannot reach the allevios auth server, however this is only possible if the user has a account with
 * fallback mode, and the agent has got a configuration ever.
 *
 */

var startup = function(){
  if(config.logLvl >= 2){
    global.log['info']('Request Things');
  }
  restC('/api/Things','GET',null,'0.0.0.0','9000',function(result){
    if(config.logLvl >= 2){
      global.log['info']('Found Things:');
      global.log['info'](util.inspect(result,{depth: null}));
    }
    templateEngine.createThings(result);
  });
};

//-------------------------
// Error Handling
//-------------------------

/**
 * If we Run in a Exception that is not handled
 * we kill the program and start new.
 * Thats a indicator for a serious bug.
 * We kill the program also if we can't connect to the database
 **/

process.on('uncaughtException', function(exception){
  global.log['fatal']('Uncaught Exception!');
  global.log['fatal'](exception);
  //process.exit(-1);
});

startup();

