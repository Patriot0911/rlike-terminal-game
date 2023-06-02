const { printUserdata, lvlUpProcedure } = require('../utils');
const { gMenus, modEvents } = require('../globals');

module.exports = {   
    menu(userdata, args){
        if(userdata.temp.adv_act >= userdata.temp.max_acts || !modEvents[`${args}_list`]){
            return gMenus.get('end_adv')(userdata, `${args}|${userdata.temp.adv_act >= userdata.temp.max_acts ? 'max' : 'empty_events'}`);
        }
        if(userdata.temp.health <= 0){
            return gMenus.get('death_in_adv')(userdata).show();
        }
        if(userdata.temp.lvluped){
            return lvlUpProcedure(userdata, [gMenus.get('random_adv'), args, true]);
        }
        ++userdata.temp.adv_act;
        printUserdata(userdata, {x: 40, y: 2}, 1);
        let eventid = Math.floor(Math.random()*modEvents[`${args}_list`].length);
        console.clear();
        if(modEvents[`${args}_list`].length > 1){
            if(userdata.temp.lastadv === eventid){
                eventid = modEvents[`${args}_list`][eventid+1] ? eventid+1 : eventid-1;
            }
            userdata.temp.lastadv = eventid;
        }
        const event = modEvents[`${args}_list`][eventid];
        return modEvents[args].get(event)(userdata, args);
    }
};

module.exports.info = {
    name: "random_adv"
}