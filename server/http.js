var app = require('express')(),
sqlite3 = require('sqlite3').verbose(),
path = require('path'),
fs = require('fs'),
config = require('../config').config,
dbPath = path.join(__dirname, '../',  config.logPath, config.channel.substring(1)),
port = 1973;

function checkDate(dbPath){  //Return db path
    var date = new Date,
    toyear = date.getFullYear(),
    file = toyear+'.db';
    if (!fs.existsSync(path.join(dbPath, file))) {
        return path.join(dbPath, toyear-1+'.db');
    }else{
        return path.join(dbPath, file);
    }
}

app.set('views', path.join(__dirname, '../template'));
app.engine('html', require('ejs').renderFile);
app.listen(port);
app.get('/', function(req, res){
    var headline = config.host + ' > ' + config.channel,
    topmenu = '',
    d = new Date(),
    date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(),
    result = '',
    startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate())/1000|0,
    db = new sqlite3.Database(checkDate(dbPath));
    //db.each("SELECT * FROM log ORDER BY rowid DESC LIMIT 20", function(err, obj){
    db.each("SELECT * FROM log WHERE timestamp >= "+startOfDay, function(err, obj){
        var time = new Date(obj['timestamp']*1000),
        tag = (obj['tag']||'');
        obj['name'] = (obj['tag']=='__SYSTEM__') ? '':obj['name'];  //System message won't play name.
        result = '    <div class="log"><div class="time">'+ time.getHours()+':'+time.getMinutes()+':'+time.getSeconds() +'</div><div class="name">'+obj['name']+'</div><div class="tag">'+ tag +'</div><div class="msg '+tag+'">'+obj['msg']+'</div></div>\n' + result;
    }, function(){
        res.render('index.ejs', {'headline': headline, 'datemenu':date, 'topmenu': topmenu, 'result': result});
    });
    db.close();
});
