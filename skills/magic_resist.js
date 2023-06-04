const { dmg_types } = require('../globals');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.magic) return dmg;
        const count = dmg-dmg*(skill_lvl > 45 ? 45 : skill_lvl)/100
        clrlog(`╔ Викорастино {green}[${userdata.skills['magic_resist'].displayName}]{/green}\n╚ Пошкодження від магії послаблені на {yellow}[${Math.floor((count/dmg)*100)}%]{/yellow}`);
        return count;
    }
};

module.exports.info = {
    name:           'magic_resist',
    displayName:    'Magical resistance',
    event:           'damage_taken',
    required:        0
};