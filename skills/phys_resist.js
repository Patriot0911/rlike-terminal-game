const { clrlog } = require('../utils');
const { dmg_types } = require('../globals');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.physic && dmg_type !== dmg_types.magic) return dmg;
        let count = dmg, proc = 0;
        if(dmg_type === dmg_types.physic){
            proc = (skill_lvl > 50 ? 50 : skill_lvl);
            count -= dmg*proc/100;
            clrlog(`╔ Викорастино {green}[${userdata.skills['phys_resist'].displayName}]{/green}\n╚ Фізичні пошкодження послаблені на {yellow}[${proc}%]{/yellow}`);
        }else{
            proc = (skill_lvl > 25 ? 25 : skill_lvl);
            count += dmg*proc/100;
            clrlog(`╔ Використовши {green}[${userdata.skills['phys_resist'].displayName}]{/green} ви отримали дебафф\n╚ Магічні пошкодження підвищені на {yellow}[${proc}%]{/yellow}`);
        }
        return count;
    }
};

module.exports.info = {
    name:           'phys_resist',
    displayName:    'Physical resistance',
    event:          'damage_taken',
    cat:            'classic'
};