Log Grapher
===========

A node.js irc bot with sqlite database. Log Grapher contains logbot and a http server to serve log files. It's designed for extended usage with possible minimal resources.

The first code is based on https://github.com/felixge/nodelog.

Manual
------
For using this program, node.js must be installed. For installing, in the main install folder(where the "log-grapher" file located):

1. Type `npm install` and wait the net installing finished.
2. Copy the `config.template.js` to `config.js` and change settings. Using default bot username could be a major problem since duplicated username will stoping it from login.
3. Now it's ready to use. Type `./log-grapher``COMMAND`(in Windows, `log-grapher``COMMAND`), `COMMAND` could be start|stop|restart|httpstart|httpstop|httprestart.
4. By default, the log files located /log/channel_name/year.db. You'll got a file every year.

Modification
------------
Template files located at Site/template. Since it's aimed for high performance, most things wrote on same file(even CSS and favicon) and it's not easy to modify.

License
-------
Licensed under [The Artistic License 2.0](http://opensource.org/licenses/Artistic-2.0).
