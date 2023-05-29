const { printUserdata, replaceClr } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus } = require('../globals');

const HndlPlayMainMenu = async (userdata, data) => {
    if(data == 'Back') {
        gMenus.get('playstart')(userdata).show();
        return;
    }
    console.clear();
    gMenus.get(data.toLowerCase().replace(' ', '_'))(userdata).show();
}
module.exports = {   
    menu(userdata, args){
        printUserdata(userdata, {x: 40, y: 0});
        const params = [
            ["Wander the world"],
            ["{red}Enter the Dungeon{/red}"],
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
    name: "adventure"
}