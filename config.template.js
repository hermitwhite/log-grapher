exports.config = {
  host: 'localhost',    //IRC server
  irc_port: 6667,
  http_port: 1973,
  channel: '#log_grapher',
  user: 'log_grapher',  //You must change this, an used ID will cause halt
  allow_jsonp: false,   //For remote ajax call
  recognizer: 'hello.js',   //Module for recognize sentence structure
  reply_module: ['hello'],  //Module for recognize sentence content and reply 
  logPath: 'log'
};
