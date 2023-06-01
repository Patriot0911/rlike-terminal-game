const { dmg_types } = require("../globals");
const { takeDamage, clrlog, randomInt } = require("../utils");

module.exports = {
    async callback(userdata, target, skill_lvl){
        const dmg = await takeDamage(userdata, dmg_types.poison, target.dmg.min+randomInt(0, skill_lvl*0.7));
        const keys = Object.keys(target.skills);
        clrlog(`╔ Використано {red}[${target.skills['spit'].DisplayName}]{/red}`);
        if(!userdata.temp.efects.poisoned){
            for(let i = 0; i < keys.length; i++){
                if(keys[i].includes('poison_effect')){
                    clrlog(`║ Отримано ефект {magenta}[Отруєння]{/magenta}`);
                    userdata.temp.efects.poisoned = true;
                    break;
                }
            }
        }
        clrlog(`╚ Отримано {red}[${dmg}]{/red} шкоди`);
    }
};

module.exports.info = {
    name:           'spit',
    event:          'active'
};