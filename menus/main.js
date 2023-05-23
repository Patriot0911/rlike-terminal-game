const { sleep, clrlog } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus } = require('../globals');

const HndlMainMenu = async (userdata, data) => {
    switch(data){
        case 'Play' :
            console.clear();
            gMenus.get('playmainmenu')().show();
        break;
        case 'Saves' :
            console.clear();
            gMenus.get('savesmainmenu')().show();
        break;
        case 'Editor' :

        break;
    }
}
module.exports = {   
    menu(userdata, args){
        const params = [
            ['Play'],
            ['Saves'],
            ['Edittor']
        ];
        return new Selector({
            question:   " ",
            options:    params,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlMainMenu);
    }
};

module.exports.info = {
    name: "mainmenu"
}