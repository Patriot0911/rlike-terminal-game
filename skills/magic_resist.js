const { dmg_types } = require('../globals');

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        if(dmg_type !== dmg_types.physic && dmg_type !== dmg_types.magic) return dmg;
        let count = dmg;
        if(dmg_type === dmg_types.magic){
            count -= dmg*0.01*(skill_lvl > 35 ? 35 : skill_lvl);
        }else{
            count += dmg*0.01*(skill_lvl > 25 ? 25 : skill_lvl);
        }
        return count;
    }
};

module.exports.info = {
    name:           'magic_resist',
    displayName:    'Magical resistance',
    type:           'passive',
    required:        0,
    expected_event: 'damage_taken'
};