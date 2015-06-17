"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _telehash = require("telehash");

var _telehash2 = _interopRequireDefault(_telehash);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var teletunnel = function teletunnel(proxy, _ref, cb) {
  var hostname = _ref.hostname;
  var port = _ref.port;
  var subdomain = _ref.subdomain;
  var mesh = _ref.mesh;

  proxy = typeof proxy === "number" ? "http://localhost:" + proxy : typeof proxy === "object" ? proxy : null;

  if (!proxy) throw new Error("invalid local argument");

  function onMesh(err, mesh) {
    console.log("onmesh");
    if (err) throw err;

    function onRemote(res) {
      res.on("data", function (data) {
        var server = mesh.link(JSON.parse(data.toString()));

        server.status(function (err, status) {
          console.log("server link up: ", status.up);

          mesh.proxy(proxy);
        });
      });
    }

    var url = "http://" + hostname + ":" + port + "/telehash.hashname";
    console.log("url", url);
    _http2["default"].request(url, onRemote).on("error", cb).end();
  }

  if (!mesh) _telehash2["default"].load({ id: process.cwd() + "/.teletunnel_local_id" }, onMesh);else onMesh(null, onMesh);
};

exports["default"] = teletunnel;
module.exports = exports["default"];