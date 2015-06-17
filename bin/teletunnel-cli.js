var Teletunnel = require("../main.js");
var argv = require("minimist")(process.argv.slice(2))
var url_parse = require("url-parse")
console.log("process.argv", argv)
if (!argv.p || !argv.u){
  console.log("must supply a local port and remote url configuration, e.g. teletunnel -p 8000 -u http://teletunnel-server.com")
} else {
  var parsed = new url_parse(argv.u)
  Teletunnel(argv.p, parsed, function(err, url ){
    console.log("tunneled at " + url)
  })
}
