const { clrlog, printUserdata } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus } = require('../globals');

const HndlPlayMainMenu = async (userdata, data) => {
    if(data == 'Back') {
        gMenus.get('mainmenu')().show();
        return;
    }
    console.clear();
    gMenus.get('playstart')(userdata).show();
}
module.exports = {   
    menu(userdata, args){
        if(userdata.name === 'None'){
            return gMenus.get('game_beginning')(userdata);
        }
        printUserdata(userdata, {x: 40, y: 0});
        const params = [
            ["Adventure"],
            ["Skill inspection"],
            ["Back"]
        ];
        return new Selector({
            question:   "Welcome!",
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