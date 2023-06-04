const { sleep, clrlog, takeDamage, pushSkill } = require('../utils');
const { gMenus, dmg_types } = require('../globals');

const HndlUnluckyEven = async (userdata, data) => {
    console.clear();
    const keys = Object.keys(userdata.skills);
    if(keys.includes('poison_resist') && userdata.skills['poison_resist'].lvl > 0){
        clrlog(`╔ Викорастино {red}[${userdata.skills['poison_resist'].DisplayName}]{/red}\n╚ Пошкодження від отрути усунуті`);
    }else{
        const dmg = await takeDamage(userdata, dmg_types.poison, Math.round(Math.random()*5)+1);
        clrlog(`Отримано {red}${dmg}{/red} шкоди від отрути`);
        if(Math.floor(Math.random()*100) < 15){
            clrlog('{magenta}[Здібність Роздобуто]{/magenta} Отримано імунітет від отрути');
            pushSkill(userdata, 'poison_resist');
            await sleep(1000);
        }
    }
    await sleep(1000);
    console.clear();
    gMenus.get('random_adv')(userdata, data).show();
};

module.exports = {
    action(userdata, args){
        return gMenus.get('phrase_menu')(userdata, args, HndlUnluckyEven, 'unlucky_evening', 1);
    }
};

module.exports.info = {
    name: "unlucky_evening",
    cat:  "wander_the_world"
};