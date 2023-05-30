const { printUserdata, deleteClrs } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs } = require('../globals');
const { Dungeon_lvl } = require(`../${game_configs['gameconf']}`)

const HndlPlayAdvMainMenu = async (userdata, data) => {
    if(data == 'Back') {
        gMenus.get('playstart')(userdata).show();
        return;
    }
    console.clear();
    gMenus.get('begin_adventure')(userdata, deleteClrs(data.toLowerCase().replaceAll(' ', '_')).split('[')[0]).show();
}
module.exports = {   
    menu(userdata, args){
        printUserdata(userdata, {x: 40, y: 2});
        const params = [
            ["Wander the world"],
            [`{red}Enter the Dungeon${(userdata.lvl > Dungeon_lvl ? ` ` : `[${Dungeon_lvl} lvl]`)}{/red}`],
            ["Back"]
        ];
        return new Selector({
            question:   "Select game mode:\nBe careful because u can save your progress only after finishing journey*",
            options:    params,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlPlayAdvMainMenu, userdata);
    }
};

module.exports.info = {
    name: "adventure"
}