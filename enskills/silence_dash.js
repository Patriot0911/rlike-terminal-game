const { dmg_types } = require("../globals");
const { takeDamage, clrlog } = require("../utils");

module.exports = {
    async callback(userdata, target, skill_lvl){
        const dmg = await takeDamage(userdata, dmg_types.advphysic, target.dmg.min+skill_lvl/2);
        clrlog(`╔ Використано {red}[${userdata.temp.enemy.skills['silence_dash'].DisplayName}]{/red}\n╚ Отримано {red}[${dmg}]{/red} шкоди`);
    }
};

module.exports.info = {
    name:           'silence_dash',
    event:          'active'
};