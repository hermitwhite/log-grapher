function reply(user, rec){
    var lang = 'system';    //Language of this document

    if(rec['language'].indexOf(lang)!=-1){
        var speech = [
            '我是Seiken開發的IRC logbot，hello world！',
            '我是Seiken開發的駐站程式，我的工作是幫大家把留言紀錄下來。',
            '我是這裡的logbot，我可以用比你快很多的速度打字。'
        ];
        if(rec['paragraph_result'][0][0] == 'whois'){
            return speech[Math.round(Math.random()*(speech.length-1))];
        }
    }
}

module.exports.reply = reply;
