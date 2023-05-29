const { printUserdata } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus } = require('../globals');

const HndlPlayStartMenu = async (userdata, data) => {
    if(data == 'Back') {
        gMenus.get('mainmenu')().show();
        return;
    }
    console.clear();
    gMenus.get(data.toLowerCase().replace(' ', '_'))(userdata).show();
}
module.exports = {
    menu(userdata, args){
        if(userdata.name === 'None'){
            return gMenus.get('game_beginning')(userdata);
        }
        printUserdata(userdata, {x: 40, y: 1});
        const params = [
            ["Adventure"],
            ["Skills Inspection"],
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
        }, HndlPlayStartMenu, userdata);
    }
};

module.exports.info = {
    name: "playstart"
}