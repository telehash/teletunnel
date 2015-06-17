import telehash from "telehash"
import http from "http"
import Server from "server/router.js"

var teletunnel = function teletunnel(proxy, {hostname, port, subdomain, mesh}, cb){

  proxy = (typeof proxy === "number") ? "http://127.0.0.1:" + proxy
        : (typeof proxy === "object") ? proxy
        : null;

  if (!proxy) throw new Error("invalid local argument")

  function onMesh(err, mesh){
    console.log("onmesh")
    if (err) throw err;

    function onRemote(res){
      res.on("data",function(data){
        var server = mesh.link(JSON.parse(data.toString()));

        server.status(function(err,status){
          console.log("server link up: ", status.up)

          mesh.proxy(proxy);

        })
      })
    }

    var url = "http://" + hostname + ":" + port +  "/telehash.hashname"
    console.log("url", url)
    http.request( url , onRemote)
        .on("error", cb)
        .end()

  }

  if (!mesh)
    telehash.load({id: process.cwd() + "/.teletunnel_local_id"}, onMesh);
  else
    onMesh(null, onMesh)






}

teletunnel.Server = Server

export default teletunnel
