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


exports.createRobot = function(thing) {
  var robot = {
    name: thing.t_id,
    connections: {
      hue: {
        adaptor: thing.c_adaptor,
        host: thing.c_host,
        username: thing.c_username
      }
    },
    devices: {
      bridge: {driver: 'hue-bridge'}
    }
  };
  for(var i = 0; i < thing.dps.length; i++){
    robot.devices[thing.dps[i].dp_id] = {
      driver: thing.dps[i].dr_name,
      lightId: thing.dps[i].dp_io
    };
  }
  return robot;
};
