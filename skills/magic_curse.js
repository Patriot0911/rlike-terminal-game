const { dmg_types } = require('../globals');
const { clrlog } = require('../utils');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.magic) return dmg;
        const count = dmg*(1.5-skill_lvl/50);
        clrlog(`<<Спрацювало прокляття>>`);
        clrlog(count > dmg ? `{red}Шкода підвищена{/red} [${dmg} -> ${count}]` : `{green}Шкоду зменшено{/red} [${dmg} -> ${count}]`);
        return count;
    }
};

module.exports.info = {
    name:           'magic_curse',
    displayName:    'Magic Curse',
    event:          'damage_taken',
    required:        0
};