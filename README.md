Log Grapher
===========

A node.js irc bot with sqlite database. Log Grapher contains logbot and a http server to serve log files. It's designed for extended usage with possible minimal resources.

The first code is based on https://github.com/felixge/nodelog.

Screenshot
----------
![Log Grapher screnshot](https://raw.github.com/Seiken-2ch/log-grapher/screenshot/screenshot.png)

Manual
------
For using this program, node.js must be installed. For installing Log Grapher, in the main folder(where the "log-grapher" file located):

1. Type `npm install` and wait the net installing finished.
2. Copy the `config.template.js` to `config.js` and change settings. Using default bot username could be a major problem since duplicated username will stoping it from login.
3. Now it's ready to use. Type `./log-grapher``COMMAND`(in Windows, `log-grapher``COMMAND`), `COMMAND` could be start|stop|restart|httpstart|httpstop|httprestart.
4. By default, the log files located at /log/channel_name/year.db. You'll got a log file every year.

Modification
------------
Template files located at /site/template. Since it's aimed for high performance, most things wrote on same file(even CSS and favicon) and it's not easy to modify.

Chat Bot
--------
The model should acts like a language recognizing system. You need two modules to make it work: sequence-contiguous(could be n-gram or just keywords searching), and recognize-reply. The first module should return an array as `[paragraph_result:[[sequence, word-class]], language:[language-type-array]]`, and be analyzed with all registered replying module. The modules located at /prenu(the lojban word "person"), it's already a pair of "Hello world" modules there.

This project seems not to have enough resouces to develop a real language recognizing system, yet.

License
-------
Licensed under [The Artistic License 2.0](http://opensource.org/licenses/Artistic-2.0) since this project's director is a self-centered artist.
