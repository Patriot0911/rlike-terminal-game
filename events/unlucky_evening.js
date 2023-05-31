const { Selector } = require('../classes/selector');
const { printUserdata, sleep, clrlog, takeDamage, addXp } = require('../utils');
const { game_configs, gMenus, dmg_types } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)


const HndlDragonQuest = async (userdata, data) => {
    console.clear();
    const dmg = await takeDamage(userdata, dmg_types.poison, Math.round(Math.random()*5)+1)
    clrlog(`Отримано {red}${dmg}{/red} шкоди від отрути`);
    await sleep(1000);
    console.clear();
    gMenus.get('random_adv')(userdata, data).show();
}

module.exports = {
    action(userdata, args){
        const str = phrases['unlucky_evening'];
        printUserdata(userdata, {x: 40, y: 2+(str.match((/\n/g) || []) ? str.match((/\n/g) || []).length : 0)}, 1);
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
    name: "unlucky_evening",
    cat:  "wander_the_world"
}