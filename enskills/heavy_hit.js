const { dmg_types } = require("../globals");
const { takeDamage, clrlog, randomInt } = require("../utils");

module.exports = {
    async callback(userdata, target, skill_lvl){
        let  value = target.dmg.min+randomInt(skill_lvl/1.5, skill_lvl*4) + (userdata.temp.efects.confused ? 20 : 0);

        const dmg = await takeDamage(userdata, dmg_types.physic, value);
        clrlog(`╔ Використано {red}[${target.skills['heavy_hit'].DisplayName}]{/red}`);
        if(!userdata.temp.efects.confused){
            userdata.temp.efects.confused = true;
            clrlog(`║ Отримано негативний ефект {red}[Дезорієнтація]{/red}`);
        }
        clrlog(`╚ Отримано {red}[${dmg}]{/red} шкоди`);
    }
};

module.exports.info = {
    name:           'heavy_hit',
    event:          'active'
};