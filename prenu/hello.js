function recog(user, text){
    var who = ['誰', '哪位', '什麼人', '人認識', '谁', 'who', 'whois'],
    hi = ['Hi', 'Hello', '嗨'];

    for(var i in who){
        if(text.indexOf(who[i])!=-1){
            return {paragraph_result:[['whois', 'N']], language:['hello']};
        }
    }
    for(var i in hi){
        if(text.indexOf(hi[i])!=-1){
            return {paragraph_result:[['hi', 'N']], language:['hello']};
        }
    }
    return {paragraph_result:[[]], language:[]};
}

module.exports.recog = recog;
