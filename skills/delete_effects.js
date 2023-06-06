const { dmg_types } = require("../globals");
const { clrlog, getMaxHealth, sleep, takeDamage } = require("../utils");

module.exports = {
    async callback(userdata, target, skill_lvl){
        const manacost = 30;    
        if(userdata.temp.mana < manacost){
            const chance = Math.floor(Math.random()*((25+userdata.ups.intelligence) > 80 ? 80 : (25+userdata.ups.intelligence)));
            clrlog(`╔ Використано {green}[${userdata.skills['delete_effects'].displayName}]{/green}`);
            clrlog(`║ Використання закляття потребує {blue}[${skill_lvl}]{/blue} мани`);
            clrlog(`║ Шанс успішного використання {yellow}[${chance}%]{/yellow}`);
            await sleep(1000);
            if(Math.floor(Math.random()*100) < chance) {
                clrlog(`╚ {green}[Успіх!]{green} Негативні ефекти усунено`);
                userdata.temp.efects = {};
            }else{
                const taken = takeDamage(userdata, dmg_types.absolute, skill_lvl/2);
                clrlog(`╚ {red}[Провал]{red} Отримано {red}[${taken}]{/red} шкоди`);
            }
            await sleep(1000);
        }else{
            clrlog(`╔ Використано {green}[${userdata.skills['delete_effects'].displayName}]{/green}\n╚ Негативні ефекти усунено`);
            userdata.temp.efects = {};
        }
        userdata.temp.mana -= manacost;
    }
};

module.exports.info = {
    name:           'delete_effects',
    displayName:    'Очищення',
    event:          'active',
    cat:            'uncommon'
};