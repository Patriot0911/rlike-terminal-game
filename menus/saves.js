const { Selector } = require('../classes/selector');
const { gMenus } = require('../globals');

const HndlSavesMainMenu = (userdata, data) => {
    switch(data){
        case 'Create' :
            console.clear();
            gMenus.get('savescreatemenu')().show();
        break;
        case 'Delete' :
            console.clear();
            gMenus.get('savesdeletemenu')().show();
        break;
        case 'Back' :
            console.clear();
            gMenus.get('mainmenu')().show();
        break;
    }
}
module.exports = {
    menu(userdata, args) {
        const params = [
            ['Create'],
            ['Delete'],
            ['Back']
        ];
        return new Selector({
            question:   " ",
            options:    params,
            params:     params,
            begin:      {
                x: 0,
                y: 0
            }
        }, HndlSavesMainMenu);
    }
};

module.exports.info = {
    name: "savesmainmenu"
}