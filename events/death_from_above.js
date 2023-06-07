const { Selector } = require('../classes/selector');
const { printUserdata, sleep, clrlog, countSpaces, addXp } = require('../utils');
const { game_configs, gMenus } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)


const HndlDragonQuest = async (userdata, data) => {
    console.clear();
    const xp = 15;
    clrlog(`Ви отримали {green}[${xp}]{/green} досвіду, за дослідження світу.`);
    addXp(userdata, xp);
    await sleep(1000);
    console.clear();
    gMenus.get('random_adv')(userdata, data).show();
}

module.exports = {
    action(userdata, args){
        return gMenus.get('phrase_menu')(userdata, args, HndlDragonQuest, 'death_from_above', 1);
    }
};

module.exports.info = {
    name: "death_from_above",
    cat:  "wander_the_world"
}