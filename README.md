# teletunnel (0.0.9)
telehash http proxy utility for node.js.

Note
===
These first releases are primarily concerned with debugging thtp in telehash-js, so aren't super configurable via the cli.
The server component will accept ALL requests for proxying, a real configuration likely will come out with v0.1.X

Usage (node v0.10.X)
====
   npm install teletunnel

To set up a teletunnel server (on example.com)
```
   $ teletunnel-server -p 8000
```
To proxy a subdomain on a teletunnel server to a local port (3000 here)
```
   $ teletunnel -p 3000 -u http://example.com
```
the command line will spit out your subdomain (e.g. http://gtety6wv.example.com:8000/), go visit it in your browser and it will proxy over telehash to your local port 3000 :)

Note: This module runs with express-subdomain, and Express parses the request URL for a top level domain,
so developing locally without one won't be possible because Express will treat the subdomain as the domain,
and the actual domain as a TLD. you can get around this by spoofing a 'real' local domain like local.net with dnsmasq
or by modifying etc/hosts

HACKING
====
MIT license, go nuts. email Ryan Bennett (nomad.ry@gmail.com) or post an issue if you run into trouble.
