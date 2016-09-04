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

var http = require('http');
var fs = require('fs');
var ph = require('path');
var mdns = require('mdns');

const PORT=8080;

var mdnsAD = mdns.createAdvertisement(mdns.tcp('http'),PORT);


var path = 'index.html';
var type = 'text/html';

function requestHandler(request,response){
  switch(ph.extname(request.url)){
          case '.html' :
                  path = ph.basename(request.url);
                  type = 'text/html';
                  break;
          case '.png' :
                  path = ph.basename(request.url);
                  type = 'image/png';
                  break;
          case '.ico' :
                  path = ph.basename(request.url);
                  type = 'image/x-icon';
                  break;
          case '.css' :
                  path = ph.basename(request.url);
                  type = 'text/css';
                  break;
  }
  fs.exists(path,function(exists){
    if(exists){
      fs.readFile(path,function(err,data){
        response.writeHead(200, {'Content-Type' : type});
        response.write(data);
        response.end();
      });
    }else{
      response.writeHead(500);
      response.end();
    }
  });
}

var server = http.createServer(requestHandler);

server.listen(PORT,function(){
  console.log('Server Listening on: http://localhost:%s',PORT);
  mdnsAD.start();
});
