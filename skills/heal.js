const { clrlog } = require("../utils");

module.exports = {
    async callback(userdata, target, skill_lvl){
        userdata.health += skill_lvl*3;
        clrlog(`Ви відновили {green}${skill_lvl*3}{/green} свого здоров'я`);
    }
};

module.exports.info = {
    name:           'heal',
    displayName:    'heal',
    type:           'active',
    required:       0,
    expected_event: 'none'
};