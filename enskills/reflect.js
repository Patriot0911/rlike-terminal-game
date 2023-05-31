const { dmg_types } = require("../globals");
const { takeDamage } = require("../utils");

module.exports = {
    async callback(userdata, skill_lvl, dmg){
        takeDamage(userdata, dmg_types.physic, dmg*0.01*(skill_lvl > 25 ? 25 : skill_lvl));
        return dmg;
    }
};

module.exports.info = {
    name:           'reflect',
    event:           'damage_taken',
};