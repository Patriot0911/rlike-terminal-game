const { lvlUpProcedure, getMaxMana } = require('../utils');
const { gMenus, modEvents } = require('../globals');

module.exports = {   
    menu(userdata, args){
        if(userdata.temp.health <= 0){
            return gMenus.get('death_in_adv')(userdata);
        }
        if(userdata.temp.max_acts !== -1 && (userdata.temp.adv_act >= userdata.temp.max_acts || !modEvents[`${args}_list`])){
            return gMenus.get('end_adv')(userdata, `${args}|${userdata.temp.adv_act >= userdata.temp.max_acts ? 'max' : 'empty_events'}`);
        }
        if(userdata.temp.lvluped){
            return lvlUpProcedure(userdata, [gMenus.get('random_adv'), args, true]);
        }
        ++userdata.temp.adv_act;
        const maxmana = getMaxMana(userdata);
        if(userdata.temp.mana < maxmana){
            userdata.temp.mana += (userdata.temp.mana+0.2 > maxmana ? maxmana-userdata.temp.mana : 0.2);
            userdata.temp.mana = Math.floor(userdata.temp.mana*100)/100;
        }
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