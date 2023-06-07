const { sleep, takeDamage, clrlog, addXp, parseFile } = require('../utils');
const { game_configs, gMenus, dmg_types } = require('../globals');

const HndlCallbackEnd = async (userdata, data) => {
    console.clear();
    const custFile = parseFile(`./${game_configs["custom_adv"]}`);
    const res = data.split('|');
    const value = custFile[res[1]].data;
    switch(custFile[res[1]].action){
        case 'xp':
            clrlog(`Ви отримали {green}[${value}]{/green} досвіду, за дослідження світу`);
            addXp(userdata, value);
        break;
        case 'dmg':
            const dmg = await takeDamage(userdata, dmg_types.physic, value);
            clrlog(`Отримано {red}${dmg}{/red} шкоди`);
        break;
    }
    await sleep(6000);
    console.clear();
    gMenus.get('random_adv')(userdata, res[0]).show();
}

module.exports = {
    action(userdata, args, eventname){
        const custFile = parseFile(`./${game_configs["custom_adv"]}`);
        return gMenus.get('phrase_menu')(userdata, `${args}|${eventname}`, HndlCallbackEnd, custFile[eventname].phrases.split('|'), 1);
    }
};

module.exports.info = {
    name: "custom_event",
    cat:  "tech"
}