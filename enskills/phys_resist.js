const { dmg_types } = require("../globals");
const { clrlog } = require("../utils");

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.physic) return dmg;
        clrlog(`╔ Суперник використав {red}[${userdata.temp.enemy.skills['phys_resist'].DisplayName}]{/red}\n╚ Фізичні пошкодження послаблені на {yellow}[${skill_lvl}%]{/yellow}`);
        return dmg-dmg*skill_lvl/100;
    }
};

module.exports.info = {
    name:           'phys_resist',
    event:           'damage_taken',
};