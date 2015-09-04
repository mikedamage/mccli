#!/usr/bin/env node

/**
 * Memcached Stats and Cache Flush Utility
 */

var _    = require('lodash');
var net  = require('net');
var argv = require('yargs')
  .command('stats', 'Print usage statistics')
  .command('flush', 'Flush Memcached')
  .demand(1)
  .argv;

var command = argv._[0];

var client  = net.connect({ port: 11211 }, function() {
  console.log('Connected to local Memcached server');
  client.write(command + "\n");
});

client.on('data', function(data) {
  console.log(data.toString());
  client.end();
});

client.on('end', function() {
  console.log('Disconnected');
});
