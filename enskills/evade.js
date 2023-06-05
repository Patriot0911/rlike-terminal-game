const { clrlog, sleep } = require("../utils");

module.exports = {
    async callback(userdata, skill_lvl, dmg_type, dmg){
        let chance = skill_lvl;
        if(userdata.temp.efects.confused) chance *= 3;
        
        clrlog(`╔ Суперник використав {red}[${userdata.temp.enemy.skills['evade'].DisplayName}]{/red}`);
        clrlog(`║ Шанс успішного використання {yellow}[${chance}%]{/yellow}`);
        
        if(Math.floor(Math.random()*100) < chance){
            clrlog(`╚ {green}[Успіх]{/green} Пошкодження анулюються`);
            await sleep(1500);
            return 0;
        }else{
            await sleep(1500);
            clrlog(`╚ {red}[Провал]{/red} Використання здібності не було задієне`);
            return dmg;
        }
    }
};

module.exports.info = {
    name:           'evade',
    event:           'damage_taken',
};