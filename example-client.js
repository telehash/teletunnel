var teletunnel = require("./index.js/index.es15.js")


teletunnel(3000, {hostname: "localhost", port: 8000}, function(err){
  console.log("er?", err)
})
