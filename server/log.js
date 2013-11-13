var sys = require('sys'),
fs = require('fs'),
sqlite3 = require('sqlite3'),
path = require('path'),
repl = require('repl'),
irc = require('../lib/irc'),
config = require('../config').config,
botName = config.user,
dbPath = path.join(__dirname, '../',  config.logPath, config.channel.substring(1)),
recognizer = require(path.join(__dirname, '../prenu', config.recognizer)),
replyModule = [],
year = 99999;

//Load all module
for(var r in config.replyModule){
    replyModule[config.replyModule[r]] = require(path.join(__dirname, '../prenu', config.replyModule[r], 'module.js'));
}

sys.puts(sys.inspect(config));

//Write in
function writeLog(user, text, tag) {
    var date = new Date,
    toyear = date.getFullYear(),
    dbDataPath = path.join(dbPath, toyear+'.db'),
    tag = typeof tag !== 'undefined' ? tag : null,
    time = Date.now() /1000 |0,
    db, time;
    if (!fs.existsSync(dbDataPath) || year < toyear) {
        fs.mkdirSync(dbPath, 0755);
        var r = fs.createReadStream(path.join(dbPath, '../', 'empty.db')).pipe(fs.createWriteStream(dbDataPath));
        r.on('close', function(){
            db = new sqlite3.Database(dbDataPath);
            db.run("INSERT INTO log VALUES (?,?,?,?)", [time, user, tag, text]);
            db.close();
            year = toyear;
        });
    }else{
        db = new sqlite3.Database(dbDataPath);
        db.run("INSERT INTO log VALUES (?,?,?,?)", [time, user, tag, text]);
        db.close();
    }
}

var client = new irc.Client(config.host, config.port),
inChannel = false;

client.connect(botName, 'guest', 'logbot');

client.addListener('001', function() {
    this.send('JOIN', config.channel);
});

client.addListener('JOIN', function(prefix) {
    inChannel = true;

    var user = irc.user(prefix);
    writeLog(user, user+' has joined the channel', '__SYSTEM__');
});

client.addListener('PART', function(prefix) {
    var user = irc.user(prefix);
    writeLog(user, user+' has left the channel', '__SYSTEM__');
});

client.addListener('QUIT', function(prefix) {
    var user = irc.user(prefix);
    writeLog(user, user+' has disconnected', '__SYSTEM__');
});

client.addListener('DISCONNECT', function() {
    puts('Disconnected, re-connect in 5s');
    writeLog(botName, botName + ' has disconnected', '__SYSTEM__');
    setTimeout(function() {
        puts('Trying to connect again ...');

        inChannel = false;
        client.connect(botName);
        setTimeout(function() {
            if (!inChannel) {
                puts('Re-connect timeout');
                client.disconnect();
                client.emit('DISCONNECT', 'timeout');
            }
        }, 5000);
    }, 5000);
});

client.addListener('PRIVMSG', function(prefix, channel, text) {
    //switch (text) {
    //    case '!source':
    //    case '!src':
    //        this.send('PRIVMSG', channel, ':Source is here: '+config.srcUrl);
    //        break;
    //    case '!logs':
    //    case '!log':
    //        this.send('PRIVMSG', channel, ':Logs are here: '+config.logUrl);
    //        break;
    //}
    var user = irc.user(prefix);
    writeLog(user, text);
    if(text.indexOf(botName) != -1){
        var rec = recognizer.recog(user, text);
        for(var r in replyModule){
            var rep = replyModule[r].reply(user, rec);
            if(rep){
                this.send('PRIVMSG', channel, ':'+rep);
                writeLog(botName, rep);
                break;
            }
        }
    };
});

repl.start("logbot> ");
