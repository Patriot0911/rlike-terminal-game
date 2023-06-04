const { Selector } = require('../classes/selector');
const { printUserdata, countSpaces } = require('../utils');
const { gMenus, game_configs } = require('../globals');
const phrases = require(`../${game_configs['phrases']}`);

const HndlPhraseMenu = (userdata, data, pack) => {
    if(pack[0]){
        gMenus.get('phrase_menu')(userdata, data, pack[1], pack[0], pack[2]).show();
        return;
    }
    pack[1](userdata, data);
};

module.exports = {
    menu(userdata, data, callback, info, print = 1){
        let str;
        if(!Array.isArray(info)){
            str = phrases[info];
            info = null;
        }else{
            str = phrases[info[0]];
            if(info.length === 1){
                info = null;
            }else{
                info.shift();
            }
        }
        if(print)
            printUserdata(userdata, {x: 40, y: countSpaces(str)}, 1);
        return new Selector({
            question:   str,
            options:    [['Next']],
            params:     [[data]],
            begin: {
                x: 0,
                y: 0
            }
        }, HndlPhraseMenu, userdata, '$data', [info, callback, print]);
    }
};

module.exports.info = {
    name: "phrase_menu"
};