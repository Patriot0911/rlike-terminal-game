const { dmg_types } = require('../globals');
const { clrlog } = require('../utils');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(skill_lvl <= 0) return dmg;
        if(dmg_type !== dmg_types.poison) return dmg;
        const count = (dmg-dmg*(skill_lvl > 40 ? 40 : skill_lvl)/100);
        const proc = Math.floor(count/dmg);
        clrlog(`╔ Викорастино {green}[${userdata.skills['poison_resist'].displayName}]{/green}\n╚ Пошкодження від отрути послаблені на {yellow}[${proc}%]{/yellow}`);
        return count;
    }
};

module.exports.info = {
    name:           'poison_resist',
    displayName:    'Poison Immune',
    event:          'damage_taken',
    cat:            'classic'
};