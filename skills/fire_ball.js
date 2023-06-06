const { randomInt, dealDamage, clrlog, sleep, takeDamage } = require('../utils');
const { dmg_types } = require('../globals');

module.exports = {
    async callback(userdata, target, skill_lvl=1){
        if(userdata.temp.mana < skill_lvl*1.42){
            const chance = Math.floor(Math.random()*45);
            clrlog(`╔ Використано {green}[${userdata.skills['fire_ball'].displayName}]{/green}`);
            clrlog(`║ Використання закляття потребує {blue}[${skill_lvl*1.42}]{/blue} мани`);
            clrlog(`║ Шанс успішного використання {yellow}[${chance}%]{/yellow}`);
            await sleep(1500);
            if(Math.floor(Math.random()*100) < chance){
                const dmg = await dealDamage(userdata, dmg_types.fire, userdata.ups.intelligence*1.64+randomInt(0, skill_lvl*2.1)+1);
                clrlog(`╚ {green}[Успіх!]{green} Закляття здійснило {red}[${dmg}]{/red} шкоди`);
                userdata.temp.mana -= skill_lvl*1.2+1;
                userdata.temp.mana = Math.floor(userdata.temp.mana*10)/10;                
            }else{
                const taken = await takeDamage(userdata, dmg_types.absolute, skill_lvl/4);
                clrlog(`╚ {red}[Провал]{/red} Отримано {red}[${taken}]{/red} шкоди`);
            }
            await sleep(1500);
            return;
        }
        const dmg = await dealDamage(userdata, dmg_types.fire, userdata.ups.intelligence*1.64+randomInt(0, skill_lvl*2.1)+1);
        userdata.temp.mana -= skill_lvl*1.2+1;
        userdata.temp.mana = Math.floor(userdata.temp.mana*10)/10;
        clrlog(`╔ Використано {green}[${userdata.skills['fire_ball'].displayName}]{/green}`);
        clrlog(`╚ Здійснено {red}[${dmg}]{/red} шкоди`);
    }
};

module.exports.info = {
    name:           'fire_ball',
    displayName:    'Фаєр Болл',
    event:          'active',
    cat:            'uncommon'
};