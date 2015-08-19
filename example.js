'use strict';

var Pds = require('./');

var switcher = new Pds({
  host: '192.168.0.13'
}).connect();

var input = 1;

/**
 *  Make the switcher transition between sources 1 - 3 every 5 seconds
 */

setInterval(function(){

  if (input > 4) input = 1;

  switcher.prev(input);
  switcher.take();

  input++;

}, 5000);
