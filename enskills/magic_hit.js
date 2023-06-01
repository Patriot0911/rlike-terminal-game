const { dmg_types } = require("../globals");
const { takeDamage, clrlog, randomInt } = require("../utils");

module.exports = {
    async callback(userdata, target, skill_lvl){
        const dmg = await takeDamage(userdata, dmg_types.magic, randomInt(target.dmg.min, target.dmg.max)*skill_lvl/2);
        clrlog(`╔ Використано {red}[${target.skills['magic_hit'].DisplayName}]{/red}\n╚ Отримано {red}[${dmg}]{/red} шкоди`);
    }
};

module.exports.info = {
    name:           'magic_hit',
    event:          'active'
};