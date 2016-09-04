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

var templates                   =     [];


templates['cy']                 =     [];
templates['al']                 =     [];
templates['cy']['ardrone']      =     require('./cylon/ardrone_template.js');
templates['cy']['arduino']      =     require('./cylon/arduino_template.js');
templates['cy']['arduino yun']  =     require('./cylon/arduino_yun_template.js');
templates['cy']['bebop']        =     require('./cylon/bebop_template.js');
templates['cy']['beaglebone']   =     require('./cylon/beaglebone_black_template.js');
templates['cy']['bluetooth']    =     require('./cylon/ble_template.js');
templates['cy']['crazyflie']    =     require('./cylon/crazyflie_template.js');
templates['cy']['digispark']    =     require('./cylon/digispark_template.js');
templates['cy']['imp']          =     require('./cylon/imp_template.js');
templates['cy']['inteledison']  =     require('./cylon/intel_edison_template.js');
templates['cy']['intelgalileo'] =     require('./cylon/intel_galileo_template.js');
templates['cy']['inteliot']     =     require('./cylon/intel_IoT_Analytics_template.js');
templates['cy']['joystick']     =     require('./cylon/joystick_template.js');
templates['cy']['keyboard']     =     require('./cylon/keyboard_template.js');
templates['cy']['leap']         =     require('./cylon/leap_motion_template.js');
templates['cy']['m2x']          =     require('./cylon/m2x_template.js');
templates['cy']['mip']          =     require('./cylon/mip_template.js');
templates['cy']['mqtt']         =     require('./cylon/mqtt_template.js');
templates['cy']['nest']         =     require('./cylon/nest_template.js');
templates['cy']['neurosky']     =     require('./cylon/neurosky_template.js');
templates['cy']['ollie']        =     require('./cylon/ollie_template.js');
templates['cy']['opencv']       =     require('./cylon/opencv_template.js');
templates['cy']['particle']     =     require('./cylon/particle_template.js');
templates['cy']['pebble']       =     require('./cylon/pebble_template.js');
templates['cy']['philipshue']   =     require('./cylon/philips_hue_template.js');
templates['cy']['pinoccio']     =     require('./cylon/pinoccio_template.js');
templates['cy']['powerup']      =     require('./cylon/powerup_template.js');
templates['cy']['rapiro']       =     require('./cylon/rapiro_template.js');
templates['cy']['raspberry']    =     require('./cylon/raspberry_template.js');
templates['cy']['salesforce']   =     require('./cylon/salesforce_template.js');
templates['cy']['skynet']       =     require('./cylon/skynet_template.js');
templates['cy']['speech']       =     require('./cylon/speech_template.js');
templates['cy']['sphero']       =     require('./cylon/sphero_template.js');
templates['cy']['tessel']       =     require('./cylon/tessel_template.js');
templates['cy']['wiced']        =     require('./cylon/wiced_sense_template.js');
templates['al']['eib/knx']      =     require('./allevios/eib_template.js');
/**
 * Create the Things and activate it in the selected Framework.
 * The Framework is internal defined in the driver section of each datapoint.
 * However for now we support only one Framework for one thing, it is not possible
 * to use multiple frameworks with the same thing, but this support may come later,
 * thats why the framework is in the datapoint driver section.
 **/


exports.createThings = function(things) {
  for(var i = 0; i < things.length; i++){
    templates[things[i]._datapoints[0]._driver.framework][things[i]._thingtype.name.toLowerCase()].createRobot(things[i]);
  }
};

