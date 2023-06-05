const { dmg_types } = require("../globals");
const { takeDamage, clrlog, randomInt } = require("../utils");

module.exports = {
    async callback(userdata, target, skill_lvl){
        const dmg = await takeDamage(userdata, dmg_types.physic, randomInt(target.dmg.min, target.dmg.max));
        clrlog(`╔ Суперник використав {red}[${target.skills['hit'].DisplayName}]{/red}\n╚ Отримано {red}[${dmg}]{/red} шкоди`);
    }
};

module.exports.info = {
    name:           'hit',
    event:          'active'
};