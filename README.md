# allevios.io-devicehub

## Introduction 

This version is not for home use, there is no easy way to control thing's with it 
for now, cause we have not implemented a app yet. However you can create a javascript 
file who's connecting to the server or devicehub directly and send commands over there to control
things. We will provide a example file with philips hue control later.

Following things working with this version

 + Connect to Server and fetch things ( Working )
 + Wrap things with template engine ( Working )
 + Create a socket for eib gateway if a eib device found ( Working ) (Hardcoded on port 5000 for now)
 + Send commands over the template engine to the devices ( Eib or Cylon ) ( Working ) (Cylon only testet with HuE Bulps )
 + Receive commands from Server ( Not Working )  <- Server API has reached is final state can now start implement this 

## Requirements

The Devicehub needs a working and runnig version of allevios.io-server.
[https://github.com/allevios/allevios.io-server]
Install and start allevios.io-server as described in the allevios.io-server readme.

## Install

Clone the repository and run "npm install" in the root tree of the repository.

## Usage

```sh
node app.js

node app.js -l (warn and error logging)
node app.js -L (full logging)
node app.js -f (Change path to log file)
node app.js -s (Log to stdout, needs bunjan )

#Example full log to stdout

node app.js -s -L | bunjan
```

## Licence
Copyright 2015, 2016 Christian Kawalar, Daniel Schlager

This file is part of allevios.io

allevios.io is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

allevios.io is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with allevios.io.  If not, see <http://www.gnu.org/licenses/>.


