'use strict';

var net = require('net');
var util = require('util');
var events = require('events');

const cr = '\r\n';

/**
 *  Expose `Pds`
 */

module.exports = Pds;

/**
 *  Pds interface
 *
 *  @params {Object} opts
 */

function Pds(opts) {
  opts = opts || {};

  if (!opts.host) throw new Error('Must provide switcher host address');

  this.host = opts.host;
  this.port = 3000;

  this.connection = null;
};

/**
 *  Inherit the EE
 */

util.inherits(Pds, events.EventEmitter);

/**
 *  Connect to the switcher
 */

Pds.prototype.connect = function connect() {

  this.connection = net.connect(this.port, this.host);

  return this;
};

/**
 *  Send a command to the switcher
 */

Pds.prototype._send = function _send(command) {

  var buf = new Buffer(command + cr);

  this.connection.write(buf);

  return this;
};

/**
 *  Transition
 */

Pds.prototype.take = function trans() {
  var cmd = 'TAKE';
  return this._send(cmd);
};

/**
 *  Preview
 */

Pds.prototype.prev = function trans(input) {
  input = parseInt(input || '0', 10);

  if (input > 9) throw new Error('Input number cannot be greater than 9');
  if (input < 1) throw new Error('Input number cannot be greater than 9');

  var cmd = 'PREVIEW -i '+input;

  return this._send(cmd);
};
