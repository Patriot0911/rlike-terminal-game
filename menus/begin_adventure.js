const { printUserdata } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs, maxmana, maxhealth } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)
const conf = require(`../${game_configs["gameconf"]}`)

const HndlBeginAdvMenu = async (userdata, data) => {
    console.clear();
    userdata.temp.max_acts = conf[`${data}_acts`] ? conf[`${data}_acts`] : -1;
    userdata.temp.adv_act = 0;
    userdata.temp.startlvl = userdata.lvl;
    userdata.temp.health = maxhealth(userdata.lvl, userdata.ups.health);
    userdata.temp.mana = maxmana(userdata.lvl, userdata.ups.intelligence);
    gMenus.get('random_adv')(userdata, data).show();
}
module.exports = {   
    menu(userdata, args){
        if(!phrases[`${args}_begin`])
        {
            return gMenus.get('adventure')(userdata, args);
        }
        printUserdata(userdata, {x: 40, y: 2});
        return new Selector({
            question:   phrases[`${args}_begin`],
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