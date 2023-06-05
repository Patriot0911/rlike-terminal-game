const { randomInt, dealDamage, clrlog } = require('../utils');
const { dmg_types } = require('../globals');

module.exports = {
    async callback(userdata, target, skill_lvl=1){
        const dmg = await dealDamage(userdata, dmg_types.physic, userdata.ups.strength/2+randomInt(1, skill_lvl <= 0 ? 1 : skill_lvl)+1);
        clrlog(`╔ Використано {green}[${userdata.skills['punch'].displayName}]{/green}\n╚ Здійснено {red}[${dmg}]{/red} шкоди`);
    }
};

module.exports.info = {
    name:           'punch',
    displayName:    'Удар ._.',
    event:          'active',
    cat:            'classic'
};