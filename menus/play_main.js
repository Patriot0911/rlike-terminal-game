const { parseFile } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs } = require('../globals');

const HndlPlayMainMenu = async (userdata, data) => {
    if(data == 'Back') {
        gMenus.get('mainmenu')().show();
        return;
    }
    const savelist = parseFile(`./${game_configs['saves']}`);
    console.clear();
    savelist[data].temp = {};
    savelist[data].temp.keyname = data;
    gMenus.get('playstart')(savelist[data]).show();
}
module.exports = {   
    menu(userdata, args){
        const savelist = parseFile(`./${game_configs['saves']}`);
        if(!Object.keys(savelist).length){
            return gMenus.get('savesmainmenu')()
            .setCoords({
                y: 1
            })
            .setQuest('No saves found. Create new to play.');
        }
        const params = [];
        for(const item in savelist){
            params.push([item]);
        }
        params.push(['Back']);
        return new Selector({
            question:   `Select Save to play:`,
            options:    params,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlPlayMainMenu);
    }
};

module.exports.info = {
    name: "playmainmenu"
}