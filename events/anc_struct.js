const { sleep, clrlog, addXp } = require('../utils');
const { game_configs, gMenus } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)

const HndlAncStructEnd = async (userdata, data) => {
    console.clear();
    const xp = 20;
    clrlog(phrases['anc_struct_reward']);
    clrlog(`Ви отримали {green}[${xp}]{/green} досвіду, за дослідження руїн.`);
    addXp(userdata, xp);
    await sleep(6000);
    console.clear();
    gMenus.get('random_adv')(userdata, data).show();
}

module.exports = {
    action(userdata, args){
        return gMenus.get('phrase_menu')(userdata, args, HndlAncStructEnd, ['anc_struct_1', 'anc_struct_2'], 1);
    }
};

module.exports.info = {
    name: "anc_stuct",
    cat:  "wander_the_world"
}