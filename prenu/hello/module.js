function reply(user, rec){
    var lang = 'hello';    //Language of this document, en-us, zh-tw, etc.

    if(rec['language'].indexOf(lang)!=-1){
        var whoReply = [
            '我是Seiken開發的IRC logbot，hello world！',
            '我是Seiken開發的駐站程式，我的工作是幫大家把留言紀錄下來。',
            '我是這裡的logbot，我可以用比你快很多的速度打字。'
        ],
        hiReply = [
            'Hi, '+user,
            'Hello, '+user,
            'Hi there, you know I\'m a bot right?'
        ];

        switch(rec['paragraph_result'][0][0]){
            case 'whois':
                return whoReply[Math.round(Math.random()*(whoReply.length-1))];
                break;
            case 'hi':
                return hiReply[Math.round(Math.random()*(hiReply.length-1))];
                break;
        }
        return;
    }
}

module.exports.reply = reply;
