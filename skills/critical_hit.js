const { clrlog } = require('../utils');
const { dmg_types } = require('../globals');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(skill_lvl <= 0) return dmg;
        if((dmg_type !== dmg_types.advphysic && dmg_type !== dmg_types.physic) || 
            Math.floor(Math.random()*100) > (skill_lvl*2 > 45 ? 45 : skill_lvl*2)){
            return dmg;
        }
        const count = dmg+dmg*(skill_lvl*1.42 > 150 ? 150 : skill_lvl*1.42);
        clrlog(`╔ Пасивно використано {green}[${userdata.skills['critical_hit'].displayName}]{/green}`);
        clrlog(`╚ Шкоду підвищено до {red}[${count}]{/red} шкоди`);
        return count;
    }
};

module.exports.info = {
    name:           'critical_hit',
    displayName:    'Критичні пошкодження',
    event:          'damage_deal',
    cat:            'uncommon'
};