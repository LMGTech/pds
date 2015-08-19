'use strict';

var Pds = require('..');

var net = require('net');
var assert = require('assert');
var sinon = require('sinon');

describe('Pds', function(){

  var write;

  before(function(){
    sinon.stub(net, 'connect');

    write = sinon.spy()

    net.connect.returns({
      write: write
    });
  });

  after(function(){
    net.connect.restore();
  });

  describe('creating a new Pds connection', function(){
    var pds;

    it('creates a connection to a stubbed server', function(){
      
      pds = new Pds({
        host: '127.0.0.1'
      });

      pds.connect();

      assert(net.connect.called);
    });

    it('should send commands to the tcp socket for transitioning the switcher', function(){
      
      pds.take();

      var buff = write.lastCall.args;

      assert.equal('TAKE\r\n', buff.toString());
    });

    it('should send commands to the tcp socket for previewing a source', function(){
      
      pds.prev(2);

      var buff = write.lastCall.args;

      assert.equal('PREVIEW -i 2\r\n', buff.toString());
    });

  });
});
