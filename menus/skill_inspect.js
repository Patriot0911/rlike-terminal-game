const { Selector } = require('../classes/selector');
const { gMenus, game_configs } = require('../globals');

const HndlSInspectMenu = async (userdata, data) => {
    console.clear();
    gMenus.get('skills_inspection')(userdata).show();
}
module.exports = {
    menu(userdata, args){
        const conf = require(`../${game_configs['descript']}`);
        return new Selector({
            question:   conf[args] ? conf[args] : 'На жаль, ця здібність не має опису.',
            options:    [['Back']],
            params:     [['Back']],
            begin: {
                x: 0,
                y: 0
            }
        }, HndlSInspectMenu, userdata);
    }
};

module.exports.info = {
    name: "skill_inspect"
}