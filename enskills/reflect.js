const { dmg_types } = require("../globals");
const { takeDamage, clrlog } = require("../utils");

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.physic || dmg_type !== dmg_types.advphysic) return dmg;
        const tdmg = await takeDamage(userdata, dmg_types.physic, dmg*0.01*(skill_lvl > 25 ? 25 : skill_lvl));
        clrlog(`╔ Суперник використав {red}[${userdata.temp.enemy.skills['reflect'].DisplayName}]{/red}\n╚ Отримано {red}[${tdmg}]{/red} шкоди`);
        return dmg;
    }
};

module.exports.info = {
    name:           'reflect',
    event:           'damage_taken',
};