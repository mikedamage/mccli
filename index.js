#!/usr/bin/env node

/**
 * Memcached Stats and Cache Flush Utility
 */

var net  = require('net');
var argv = require('yargs')
  .usage('Usage: $0 [-s server_ip] COMMAND')
  .demand(1)
  .option('s', {
    alias: 'server',
    description: 'Server address to connect to',
    default: '127.0.0.1'
  })
  .help('h')
  .alias('h', 'help')
  .argv;

var command = argv._[0];

var client  = net.connect({ host: argv.server, port: 11211 }, function() {
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
