exports.config = {
  host: 'localhost',
  irc_port: 6667,
  http_port: 1973,
  user: 'log_grapher',
  channel: '#log_grapher',  //You must change this, an used ID will cause halt
  recognizer: 'hello.js',   //Module for recognize sentence structure
  reply_module: ['hello'],  //Module for recognize sentence content and reply 
  logPath: 'log'
};
