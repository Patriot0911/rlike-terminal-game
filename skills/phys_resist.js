const { dmg_types } = require('../globals');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.physic && dmg_type !== dmg_types.magic) return dmg;
        let count = dmg;
        if(dmg_type === dmg_types.physic){
            count -= dmg*0.01*(skill_lvl > 50 ? 50 : skill_lvl);
        }else{
            count += dmg*0.01*(skill_lvl > 20 ? 20 : skill_lvl);
        }
        return count;
    }
};

module.exports.info = {
    name:           'phys_resist',
    displayName:    'Physical resistance',
    event:          'damage_taken',
    required:        0,
};