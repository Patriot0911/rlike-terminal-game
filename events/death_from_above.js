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
        const str = phrases['death_from_above'];
        printUserdata(userdata, {x: 40, y: countSpaces(str)}, 1);
        return new Selector({
            question:   str,
            options:    [['Next']],
            params:     [['Next']],
            begin: {
                x: 0,
                y: 0
            }
        }, HndlDragonQuest, userdata, args);
    }
};

module.exports.info = {
    name: "death_from_above",
    cat:  "wander_the_world"
}