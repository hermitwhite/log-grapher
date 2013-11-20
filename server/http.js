var express = require('express'),
app = express(),
sqlite3 = require('sqlite3').verbose(),
path = require('path'),
fs = require('fs'),
config = require('../config').config,
dbPath = path.join(__dirname, '../',  config.logPath, config.channel.substring(1)),
logStart;

//Get timestamp of the first day
(function(){
    var db = new sqlite3.Database(path.join(dbPath, fs.readdirSync(dbPath).sort()[0]));
    db.get('SELECT MIN(timestamp) FROM log', function(err, obj){
        logStart = obj['MIN(timestamp)'];
    });
    db.close();
})();

app.set('views', path.join(__dirname, '../site/template'));
app.set("jsonp callback", true);
app.use('/public', express.static(path.join(__dirname, '../', 'site/public')));
app.engine('html', require('ejs').renderFile);
app.listen(config.http_port);

//Return db path
function checkDate(dbPath){
    var date = new Date,
    toyear = date.getFullYear(),
    file = toyear+'.db';
    if (!fs.existsSync(path.join(dbPath, file))) {
        return path.join(dbPath, toyear-1+'.db');
    }else{
        return path.join(dbPath, file);
    }
}

//Form div
function formResult(time, name, tag, text){
    return '<div class="log" data-timestamp="'+time+'" data-tag="'+tag+'"><div class="time"></div><div class="name">'+name+'</div><div class="tag"></div><div class="msg">'+text+'</div></div>\n';
}

function queryDB(q, callback){
    var r = '',
    db = new sqlite3.Database(checkDate(dbPath));
    db.each(q, function(err, obj){
        var tag = (obj['tag']||'');
        obj['name'] = (obj['tag']=='__SYSTEM__') ? '':obj['name'];  //System message won't play name.
        r += formResult(obj['timestamp'], obj['name'], tag, obj['msg']);
    }, function(){
        db.close();
        callback(r);
    });
}

//db.each("SELECT * FROM log ORDER BY rowid DESC LIMIT 20", function(err, obj){

//index
app.get('/', function(req, res){
    var headline = config.host + ' > ' + config.channel,
    topmenu = '';   //todo
    res.render('index.ejs', {'headline': headline, 'topmenu': topmenu, 'logStart': logStart});
});

//All day log
app.get('/method/day/:timestamp', function(req, res){
    var startOfDay = req.params.timestamp,
    endOfDay = parseInt(startOfDay, 10) + 86400;
    queryDB("SELECT * FROM log WHERE timestamp BETWEEN "+startOfDay+" AND "+endOfDay, function(r){
        res.render('log.ejs', {'result': r});
    })
})

//Last lines log with json
if(config.allow_jsonp){
    app.get('/method/data/:lines?', function(req, res){
        var l = parseInt(req.params.lines, 10);
        if(isNaN(l) || l < 1 || l > 100){l = 10;}
        queryDB("SELECT * FROM log WHERE tag ISNULL OR tag <> '__SYSTEM__' ORDER BY rowid DESC LIMIT "+l+"", function(r){
            res.jsonp('log.ejs', {'result': r});
        })
    })
}