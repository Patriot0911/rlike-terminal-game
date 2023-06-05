const { printUserdata, sleep, clrlog, addXp, pushEnemy } = require('../utils');
const { gMenus } = require('../globals');
const { beginFight } = require('../fight');

const battleEnd = async (userdata, data, result, reward) => {
    console.clear();
    if(result){
        clrlog("{green}[Перемога!]{/green}\nВи перемогли ворога, так тримати!");
        clrlog(`Отримано {green}[${reward}]{/green} досвіду`);
        addXp(userdata, reward);
        printUserdata(userdata, {x: 40, y: 1}, 1, 1);
        await sleep(2000);
    }
    delete userdata.temp.enemy;
    gMenus.get('random_adv')(userdata, data).show();
};

const HndlSmallBattle = async (userdata, data) => {
    console.clear();
    pushEnemy(userdata, 'frozen_small_battle', { random: 1 });
    const pack = {
        gotoFunc: battleEnd,
        arg: data,
    }
    beginFight(userdata, pack);
}

module.exports = {
    action(userdata, args){
        pushEnemy(userdata, 'frozen_small_battle', { random: 1 });
        return gMenus.get('phrase_menu')(userdata, args, HndlSmallBattle, 'frozen_way_1', 1);
    }
};

module.exports.info = {
    name: "frozen_small_battle",
    cat:  "dungeon_frozen"
}