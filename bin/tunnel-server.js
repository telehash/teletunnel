var teletunnel = require("../main.js")
var argv = require("minimist")(process.argv.slice(2));

if (!argv.p){
  console.log("must provide -p port, e.g. teletunnel-server -p 8000")
} else {
  teletunnel.Server(8000)
}
