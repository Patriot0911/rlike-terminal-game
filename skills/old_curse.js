const { dmg_types } = require('../globals');
const { clrlog } = require('../utils');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.magic) return dmg;
        const count = dmg+3;
        clrlog(`<<Спрацювало прокляття>>`);
        clrlog(`Старість вас наздоганяє... Шкода підвищена [${dmg} -> ${count}]`);
        return count;
    }
};

module.exports.info = {
    name:           'old_curse',
    displayName:    'Cruse of Old age',
    type:           'passive',
    required:        0,
    expected_event: 'damage_taken'
};