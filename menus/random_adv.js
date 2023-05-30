const { printUserdata } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs, modEvents } = require('../globals');
const conf = require(`../${game_configs["gameconf"]}`)

const HndlRandomAdv = async (userdata, data) => {
    gMenus.get('random_adv')(userdata, data).show();
}
module.exports = {   
    menu(userdata, args){
        if(userdata.temp.adv_act >= conf[`${args}_acts`] || !modEvents[`${args}_list`]){
            return gMenus.get('end_adv')(userdata, `${args}|${userdata.temp.adv_act >= conf[`${args}_acts`] ? 'max' : 'empty_events'}`);
        }

        ++userdata.temp.adv_act;
        printUserdata(userdata, {x: 40, y: 2}, 1);
        const event = Math.floor(Math.random()*modEvents[`${args}_list`].length)
        return new Selector({
            question:   event,
            options:    [['s']],
            params:     [['s']],
            begin: {
                x: 0,
                y: 0
            }
        }, HndlWonderPlayMenu, userdata);
    }
};

module.exports.info = {
    name: "random_adv"
}