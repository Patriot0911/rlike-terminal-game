const { printUserdata, getAdvValue, saveSave, addXp, parseExpres, countSpaces, lvlUpProcedure } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`);

const HndlEndAdvMenu = async (userdata, data) => {
    if(userdata.temp.lvluped){
        lvlUpProcedure(userdata, [HndlEndAdvMenu, userdata, false]).show();
        return;
    }
    gMenus.get('playstart')(userdata).show();
    saveSave(userdata);
}
module.exports = {   
    menu(userdata, args){
        console.clear();
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
        const xp = parseExpres(getAdvValue(argspl[0], 'xp_reward').replaceAll('lvl', userdata.lvl));
        quest += `\nОтримано {green}[${xp}]{/green} досвіду`;
        addXp(userdata, xp, 0);
        printUserdata(userdata, {x: 40, y: countSpaces(quest)}, 1);
        if(userdata.temp.startlvl !== userdata.lvl){
            quest += `\nЗдобуто рівнів: [{green}${userdata.temp.startlvl} ➢  ${userdata.lvl}{/green}]`;
        }
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