const { Selector } = require('../classes/selector');
const { printUserdata, sleep, clrlog, addXp } = require('../utils');
const { game_configs, gMenus } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)


const HndlAncStructEnd = async (userdata, data) => {
    console.clear();
    const xp = 20;
    clrlog(phrases['anc_struct_reward']);
    clrlog(`Ви отримали {green}${xp}{/green} за дослідження руїн.`);
    addXp(userdata, xp);
    await sleep(6000);
    console.clear();
    gMenus.get('random_adv')(userdata, data).show();
}

const anc_struct_2 = (userdata, data) => {
    console.clear();
    const str = phrases['anc_struct_2'];
    printUserdata(userdata, {x: 40, y: 2+(str.match((/\n/g) || []) ? str.match((/\n/g) || []).length : 0)}, 1);
    return new Selector({
        question:   str,
        options:    [['Next']],
        params:     [['Next']],
        begin: {
            x: 0,
            y: 0
        }
    }, HndlAncStructEnd, userdata, data).show();
}

module.exports = {
    action(userdata, args){
        const str = phrases['anc_struct_1'];
        printUserdata(userdata, {x: 40, y: 2+(str.match((/\n/g) || []) ? str.match((/\n/g) || []).length : 0)}, 1);
        return new Selector({
            question:   str,
            options:    [['Next']],
            params:     [['Next']],
            begin: {
                x: 0,
                y: 0
            }
        }, anc_struct_2, userdata, args);
    }
};

module.exports.info = {
    name: "anc_stuct",
    cat:  "wander_the_world"
}