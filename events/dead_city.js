const { sleep, clrlog, addXp } = require('../utils');
const { game_configs, gMenus } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)

const HndlAncStructEnd = async (userdata, data) => {
    console.clear();
    const xp = 25;
    clrlog(`Ви отримали {green}[${xp}]{/green} досвіду, за дослідження світу`);
    addXp(userdata, xp);
    await sleep(6000);
    console.clear();
    gMenus.get('random_adv')(userdata, data).show();
}

module.exports = {
    action(userdata, args){
        return gMenus.get('phrase_menu')(userdata, args, HndlAncStructEnd, ['dead_city_1', 'dead_city_2', 'dead_city_3'], 1);
    }
};

module.exports.info = {
    name: "dead_city",
    cat:  "wander_the_world"
}