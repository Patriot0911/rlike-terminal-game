const { dmg_types } = require("../globals");
const { takeDamage, clrlog } = require("../utils");

module.exports = {
    async callback(userdata, target, skill_lvl){
        const dmg = await takeDamage(userdata, dmg_types.physic, target.dmg.min+Math.floor(Math.random()*skill_lvl/2));
        clrlog(`╔ Використано {red}[${userdata.temp.enemy.skills['dash'].DisplayName}]{/red}\n╚ Отримано {red}[${dmg}]{/red} шкоди`);
    }
};

module.exports.info = {
    name:           'dash',
    event:          'active'
};