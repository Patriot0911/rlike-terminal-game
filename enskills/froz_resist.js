const { dmg_types } = require("../globals");
const { clrlog } = require("../utils");

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.frozen && dmg_type !== dmg_types.fire) return dmg;
        const count = dmg_type === dmg_types.frozen ? skill_lvl : (skill_lvl*5);
        clrlog(`╔ Суперник використав {red}[${userdata.temp.enemy.skills['froz_resist'].DisplayName}]{/red}`);
        if(dmg_type === dmg_types.fire){
            clrlog(`╚ Пошкодження від полум'я підсилені на {yellow}[${count}%]{/yellow}`);
            return dmg+dmg*count/100;
        }else{
            clrlog(`╚ Пошкодження від холоду послаблені на {yellow}[${count}%]{/yellow}`);
            return dmg-dmg*count/100;
        }
    }
};

module.exports.info = {
    name:           'froz_resist',
    event:           'damage_taken',
};