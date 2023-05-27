const { parseFile, clrlog } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs } = require('../globals');

const HndlPlayMainMenu = async (userdata, data) => {
    if(data == 'Back') {
        gMenus.get('mainmenu')().show();
        return;
    }
    console.clear();
    gMenus.get('playstart')().show();
}
module.exports = {   
    menu(userdata, args){
        console.log(userdata);
        const params = [
            ["test"],
            ["test2"]
        ];
        return new Selector({
            question:   `Select Save to play:`,
            options:    params,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlPlayMainMenu, userdata);
    }
};

module.exports.info = {
    name: "playstart"
}