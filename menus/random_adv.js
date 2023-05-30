const { printUserdata } = require('../utils');
const { gMenus, modEvents } = require('../globals');

module.exports = {   
    menu(userdata, args){
        if(userdata.temp.adv_act >= userdata.temp.max_acts || !modEvents[`${args}_list`]){
            return gMenus.get('end_adv')(userdata, `${args}|${userdata.temp.adv_act >= userdata.temp.max_acts ? 'max' : 'empty_events'}`);
        }
        if(userdata.temp.health <= 0){
            return gMenus.get('death_in_adv')(userdata).show();
        }
        ++userdata.temp.adv_act;
        printUserdata(userdata, {x: 40, y: 2}, 1);
        const event =  modEvents[`${args}_list`][Math.floor(Math.random()*modEvents[`${args}_list`].length)];
        console.clear();
        return modEvents[args].get(event)(userdata, args);
    }
};

module.exports.info = {
    name: "random_adv"
}