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

var cylon = require('cylon');
var events = require('events').EventEmitter;
var emitter = new events();

var registetDevices = [];



function Wrapper() {

}

/**
 * Creates a new Cylon Robot with the thing object, and
 * register the event handler for this device
 * @param [json] The Cylon Robot Device description
 **/

Wrapper.prototype.add = function(thing) {
    emitter.on(thing.name + '_ready', function() {
        registetDevices[thing.name] = {
            'isReady': true
        };
    });
    cylon.robot(thing).on('ready', function() {
        emitter.emit(thing.name + '_ready');
    }).start();
};

/**
 * Parses a recived json command.
 * First check if the user session is allowed to execute the command
 * then parse the command and send it to the cylon device
 **/

Wrapper.prototype.parse = function(command) {
    return cylon.MCP.robots[command.thing_id][command._dp][command.cmd].apply(null,command.params);
};

module.exports = new Wrapper();
