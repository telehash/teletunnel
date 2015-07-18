#!/usr/bin/env node

var teletunnel = require("../dist/index.js")
var argv = require("minimist")(process.argv.slice(2));
console.log("sanity")
if (!argv.p){
  console.log("must provide -p port, e.g. teletunnel-server -p 8000")
} else {
  teletunnel.Server(argv.p)
}
