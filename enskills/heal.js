const { clrlog } = require('../utils');

module.exports = {
    async callback(userdata, target, skill_lvl){
        const  count = (target.health + skill_lvl*2) > target.maxhealth ? target.maxhealth-target.health : skill_lvl*2; 
        clrlog(`╔ Суперник використав {green}[${userdata.temp.enemy.skills['heal'].DisplayName}]{/green}\n╚ Відновлено {green}[${count}]{/green} здоров'я`);
        userdata.temp.enemy.health += count;
    }
};

module.exports.info = {
    name:           'heal',
    event:          'active'
};