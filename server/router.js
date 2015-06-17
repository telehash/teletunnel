#!/usr/bin/env node

var telehash = require('telehash');
var stream = require("telehash/ext/stream.js")
var thtp = require("telehash/ext/thtp.js")
var express = require("express")
var subdomain = require("express-subdomain")




function Server (port){
  telehash.load({id:__dirname + "/.teletunnel_server"}, function(err, mesh){
    var app = express()
    mesh.router(true);
    mesh.discover(true);
    mesh.accept = mesh.link;

    app.get("/telehash.hashname", function(req,res){
      console.log("got http request for hashname")
      res.json(mesh.json())
    })
    app.listen(port)

    mesh.extending({link:function(link){
      link.status(function(err){
        var subhash = link.hashname.substr(0,8)
        console.log(subhash,err?'down':'up',err||'');
        var proxy = express.Router()

        proxy.all("*",function(req, res){
          console.log(subhash + " : proxy subdomain")
          link.proxy(req,function(pres){
            console.log("subhash proxy response", pres.headers, pres.statusCode)
            res.set(pres.headers)
            var tally = 0, len = parseInt(pres.headers["content-length"]);

            var ddata = new Buffer(0)
            pres.on("data",function(data){
              tally += data.length
              ddata = Buffer.concat([ddata, data])
              if (tally === len)
                res.send(ddata)
            })
            .on("finish", function(evt){
              console.log("total body length ",evt, tally, ddata.toString())

            })
          })
        })

        app.use(subdomain(subhash, proxy))
      });



    }});
  })
}

  ///clien
