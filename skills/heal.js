const { dmg_types } = require("../globals");
const { clrlog, getMaxHealth, sleep, takeDamage } = require("../utils");

module.exports = {
    async callback(userdata, target, skill_lvl){
        const value  = Math.floor(skill_lvl*1.5+intelligence*2);
        const maxhealth = getMaxHealth(userdata);
        const count = userdata.temp.health+value > maxhealth ? maxhealth-userdata.temp.health : value;         
        if(userdata.temp.mana < skill_lvl){
            const chance = Math.floor(Math.random()*(80-(skill_lvl > 80 ? 80 : skill_lvl)+Math.floor((userdata.temp.mana/skill_lvl)*100)));
            clrlog(`╔ Використано {green}[${userdata.skills['heal'].displayName}]{/green}`);
            clrlog(`║ Використання закляття потребує {blue}[${skill_lvl}]{/blue} мани`);
            clrlog(`║ Шанс успішного використання {yellow}[${chance}%]{/yellow}`);
            await sleep(1000);
            if(Math.floor(Math.random()*100) < chance){
                clrlog(`╚ {green}[Успіх!]{green} Відновлено {green}[${count/1.5}]{/green} свого здоров'я`);
                userdata.temp.health += count/1.5;
            }else{
                clrlog(`╚ {red}[Провал]{red} Отримано {red}[${skill_lvl/2}]{/red} шкоди`);
                takeDamage(userdata, dmg_types.absolute, skill_lvl/2);
            }
            userdata.temp.mana -= skill_lvl;
            await sleep(1000);
            return;
        }
        userdata.temp.mana -= skill_lvl;
        clrlog(`╔ Використано {green}[${userdata.skills['heal'].displayName}]{/green}\n╚ Відновлено {green}[${count}]{/green} свого здоров'я`);
        userdata.temp.health += count;
    }
};

module.exports.info = {
    name:           'heal',
    displayName:    'Зцілення',
    event:          'active',
    cat:            'classic'
};