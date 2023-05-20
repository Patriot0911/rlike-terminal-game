const { Selector } = require('../classes/selector');
const { gMenus } = require('../globals');

const HndlSavesMainMenu = (userdata, data) => {
    switch(data.toLowerCase()){
        case 'select' :

        break;
        case 'delete' :
            console.clear();
            gMenus.get('savesdeletemenu')().show();
        break;
        case 'back' :
            console.clear();
            gMenus.get('mainmenu')().show();
        break;
    }
}
module.exports = {   
    menu(userdata, args){
        const params = [
            ['Select'],
            ['Delete'],
            ['Back']
        ];
        return new Selector({
            question:   " ",
            options:    params,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlSavesMainMenu);
    }
};

module.exports.info = {
    name: "savesmainmenu"
}