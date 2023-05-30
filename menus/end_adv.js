const { printUserdata, saveSave } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs, modEvents } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)

const HndlEndAdvMenu = async (userdata, data) => {
    gMenus.get('playstart')(userdata, data).show();
}
module.exports = {   
    menu(userdata, args){
        printUserdata(userdata, {x: 40, y: 2}, 1); // TODO: Add lvl changes
        const argspl = args.split('|');
        let quest;
        switch(argspl[1]){
            case 'empty_events':
                quest = phrases['error_adv'];
            break;
            case 'max':
                quest = phrases[`${argspl[0]}_end`] ? phrases[`${argspl[0]}_end`] : phrases['error_adv'];
            break;
            default:
                quest = phrases[`${argspl[0]}_${argspl[1]}`] ? phrases[`${argspl[0]}_${argspl[1]}`] : phrases['error_adv'];
            break;
        }
        saveSave(userdata);

        return new Selector({
            question:   quest,
            options:    [['Next']],
            params:     [['Next']],
            begin: {
                x: 0,
                y: 0
            }
        }, HndlEndAdvMenu, userdata);
    }
};

module.exports.info = {
    name: "end_adv"
}