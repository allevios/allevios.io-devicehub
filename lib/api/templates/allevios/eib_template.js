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

'use strict';

/*
 * Allevios Eib Template
 */

const io = require('socket.io-client');

module.exports.createRobot = (thing) => {
  const typeJson = {};
  const dp = thing._datapoints;
  typeJson.type = 'dpt';
  for (let i = 0; i < dp.length; i++) {
    typeJson[dp[i].id] = {};
    typeJson[dp[i].id].io = dp[i].io;
    typeJson[dp[i].id].type = dp[i].cmd[0].dpType;
    //The old groupaddr value, we have to implement later to read this from a file once a newstart occour
    typeJson[dp[i].id].oldVal = 0;
    typeJson[dp[i].id].timestamp = 0;
    typeJson[dp[i].id].valueType = 0;
    typeJson[dp[i].io] = dp[i].id;

  }
  //Next connect to eib gateway driver and send the typeJson.
  //Think of a good solution to store all module data central (maybe a global json file)
  const socket = io('http://localhost:5000');

  socket.on('connect', () => {
    console.log('Connected');
    socket.send(typeJson);
  });
  socket.on('message', (msg) => {
    console.log(msg);
  });
};
