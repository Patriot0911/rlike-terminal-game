const { printUserdata, getAdvValue, countSpaces } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs, maxmana, maxhealth, modEvents } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)

const HndlBeginAdvMenu = async (userdata, data) => {
    console.clear();
    userdata.temp.max_acts = getAdvValue(data, 'acts');
    userdata.temp.adv_act = 0;
    userdata.temp.startlvl = userdata.lvl;
    userdata.temp.health = maxhealth(userdata.lvl, userdata.ups.health);
    userdata.temp.mana = maxmana(userdata.lvl, userdata.ups.intelligence);
    gMenus.get('random_adv')(userdata, data).show();
}
module.exports = {   
    menu(userdata, args){
        if(!modEvents[`${args}_list`]){
            return gMenus.get('adventure')(userdata, args);
        }
        const str = phrases[`${args}_begin`] ? phrases[`${args}_begin`] : phrases['classic_begin'];
        printUserdata(userdata, {x: 40, y: countSpaces(str)});
        return new Selector({
            question:   str,
            options:    [['Next']],
            params:     [[' ']],
            begin: {
                x: 0,
                y: 0
            }
        }, HndlBeginAdvMenu, userdata, args);
    }
};

module.exports.info = {
    name: "begin_adventure"
}