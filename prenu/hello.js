function recog(user, text){  //Return db path.
    if(text.indexOf('誰')!=-1||text.indexOf('什麼人')!=-1||text.indexOf('人認識')!=-1||text.indexOf('who')!=-1||text.indexOf('谁')!=-1||text.indexOf('whois')!=-1){
        return [['whois', 'N']];
    }else{
        return '[]';
    }
}

module.exports.recog = recog;
