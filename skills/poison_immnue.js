const { dmg_types } = require('../globals');
const { clrlog } = require('../utils');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.poison) return dmg;
        const chance = (skill_lvl > 30 ? 30 : skill_lvl)*2;
        const count = Math.random(Math.random()*100) > chance ? dmg : 0;
        clrlog('<<Спрацював імунітет до отрути>>');
        return count;
    }
};

module.exports.info = {
    name:           'poison_immune',
    displayName:    'Poison Immune',
    event:          'damage_taken',
    required:        0,
};