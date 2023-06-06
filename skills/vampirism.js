const { dmg_types } = require('../globals');
const { clrlog } = require('../utils');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(skill_lvl <= 0) return dmg;
        if(dmg_type === dmg_types.absolute || dmg_type === dmg_types.fire  || dmg_type === dmg_types.frozen) return dmg;
        const proc = (skill_lvl*1.5 > 60 ? 60 : skill_lvl*1.5);
        const count = dmg * proc/100;
        clrlog(`╔ Викорастино {green}[${userdata.skills['vampirism'].displayName}]{/green}`);
        clrlog(`╚ отримано {green}[${count}]{/green} здоров'я, що складає {yellow}[${proc}%]{/yellow}`);
        return dmg;
    }
};

module.exports.info = {
    name:           'vampirism',
    displayName:    'Вампиризм',
    event:          'damage_deal_post',
    cat:            'classic'
};