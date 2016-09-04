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

var io = require('socket.io')();
var subscribedUsers = {};
var cylonWrapper = require('./cylon_wrapper.js');
var config = require('../../config/config.js');

module.exports.enableListener = function(){
  io.on('connection',function(socket){
    socket.on('subscribe',function(data){
      if(config.logLvl >= 2){
        global.log['info']('Socket Event Subscribe ');
      }
      //TODO Add User id after demo
      global.DpsOverSites.find({},'*',function(err,result){
        if(err){
          console.log(err);
        }
        if(!result){
          if(config.logLvl >=1){
            global.log['warn']("User has no Datapoints!");
          }
        }
        subscribedUsers[socket.id] = {};
        for(var i = 0; i < result.length; i++){
          subscribedUsers[socket.id][result[i].dp_id] = {};
          subscribedUsers[socket.id][result[i].dp_id].thing_id = result[i].dp_thingid;
          subscribedUsers[socket.id][result[i].dp_id].cmd = 'cmd';
          subscribedUsers[socket.id][result[i].dp_id].params = [];
          console.log(global.registetThings[result[i].dp_thingid].dps);
        }
        io.to(socket.id).emit('subResult',subscribedUsers[socket.id]);
      });

    });

    socket.on('cmd',function(data){
      console.log('Got Command:');
      console.log(data);
      cylonWrapper.parse({
        _dp: data.dp_id,
        thing_id: subscribedUsers[socket.id][data.dp_id].thing_id,
        cmd: data.cmd,
        params: data.params
      });
    });

    socket.on('error',function(error){

      console.log('Socket Error! ' + error);
    });

    socket.on('disconnect',function(){
      console.log('Disconnected: ' + socket.id);
      delete subscribedUsers[socket.id];
    });

  });
  io.on('error',function(error){
    console.log(error);
  });
  io.listen(3000);
};
